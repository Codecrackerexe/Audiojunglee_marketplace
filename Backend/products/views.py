from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Product, AudioFile
from .serializers import ProductSerializer, AudioFileSerializer
from .permissions import IsSellerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import validate_audio_file, get_audio_metadata

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSellerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'category__name']
    ordering_fields = ['created_at', 'price', 'title']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if category:
            queryset = queryset.filter(Q(category__id=category) | Q(category__parent__id=category))
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_products(self, request):
        products = Product.objects.filter(seller=request.user)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='upload-audio', 
            permission_classes=[permissions.AllowAny],
            parser_classes=[MultiPartParser, FormParser])
    def upload_audio(self, request):
        audio_file = request.FILES.get('audio_file')

        if not audio_file:
            return Response({'error': 'No audio file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        is_valid, msg = validate_audio_file(audio_file)
        
        if not is_valid:
            return Response({'error': msg}, status=status.HTTP_400_BAD_REQUEST)

        metadata = get_audio_metadata(audio_file)
        
        if not metadata:
            return Response({'error': 'Failed to extract audio metadata'}, status=status.HTTP_400_BAD_REQUEST)

        required_keys = ['duration', 'file_size', 'sample_rate']
        for key in required_keys:
            if key not in metadata:
                return Response({'error': f'Missing metadata: {key}'}, status=status.HTTP_400_BAD_REQUEST)

        audio_file_obj = AudioFile.objects.create(
            file=audio_file,
            duration=metadata['duration'],
            file_size=metadata['file_size'],
            format=metadata['sample_rate']
        )

        serializer = AudioFileSerializer(audio_file_obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)