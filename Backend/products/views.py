import os
from django.conf import settings
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, AudioMetadata
from .serializers import ProductSerializer, AudioMetadataSerializer, ProductCreateSerializer
import mutagen

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ProductCreateSerializer
        return ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Apply filters based on query parameters
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        
        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(title__icontains=search)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset
    
    def perform_create(self, serializer):
        # Set the owner to the current user
        serializer.save(owner=self.request.user)
    
    @action(detail=True, methods=['get'], url_path='audio-metadata')
    def audio_metadata(self, request, pk=None):
        """
        Endpoint to get audio metadata for a specific product
        """
        product = self.get_object()
        
        # Check if the product has an audio file
        if not product.audio_file:
            return Response({"error": "This product doesn't have an audio file"}, 
                            status=status.HTTP_404_NOT_FOUND)
        
        # Try to get existing metadata or create new
        try:
            metadata = AudioMetadata.objects.get(product=product)
        except AudioMetadata.DoesNotExist:
            # Extract metadata from the audio file
            metadata = self._extract_audio_metadata(product)
            
        serializer = AudioMetadataSerializer(metadata)
        return Response(serializer.data)
    
    def _extract_audio_metadata(self, product):
        """
        Extract metadata from the audio file and save it to the database
        """
        audio_file_path = os.path.join(settings.MEDIA_ROOT, product.audio_file.name)
        
        try:
            # Use mutagen to extract audio metadata
            audio = mutagen.File(audio_file_path)
            
            # Create or update metadata object
            metadata, created = AudioMetadata.objects.get_or_create(product=product)
            
            # Extract common metadata (implementation depends on file format)
            if hasattr(audio, 'info'):
                metadata.duration = getattr(audio.info, 'length', None)
                metadata.sample_rate = getattr(audio.info, 'sample_rate', None)
                metadata.bit_rate = getattr(audio.info, 'bitrate', None)
                metadata.channels = getattr(audio.info, 'channels', None)
            
            # Get file format from extension
            if product.audio_file.name:
                metadata.file_format = os.path.splitext(product.audio_file.name)[1][1:].lower()
            
            # Get file size
            metadata.file_size = product.audio_file.size
            
            metadata.save()
            return metadata
            
        except Exception as e:
            # In case of error, create minimal metadata
            metadata, created = AudioMetadata.objects.get_or_create(product=product)
            metadata.file_format = os.path.splitext(product.audio_file.name)[1][1:].lower()
            metadata.file_size = product.audio_file.size
            metadata.save()
            return metadata
    
    @action(detail=False, methods=['post'], url_path='upload-audio')
    def upload_audio(self, request):
        """
        Endpoint to upload an audio file without creating a full product
        """
        if 'audio_file' not in request.FILES:
            return Response({"error": "No audio file provided"}, 
                           status=status.HTTP_400_BAD_REQUEST)
            
        audio_file = request.FILES['audio_file']
        
        # Save the file temporarily
        file_path = os.path.join(settings.MEDIA_ROOT, 'temp', audio_file.name)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'wb+') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)
        
        # Return the file path to be used later when creating the product
        return Response({
            "file_name": audio_file.name,
            "file_path": file_path,
            "file_size": audio_file.size,
            "file_type": audio_file.content_type
        })