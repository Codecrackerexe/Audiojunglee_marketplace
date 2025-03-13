from rest_framework import viewsets, permissions
from .models import Category
from .serializers import CategorySerializer, CategoryTreeSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def tree(self, request):
        root_categories = Category.objects.filter(parent=None)
        serializer = CategoryTreeSerializer(root_categories, many=True)
        return Response(serializer.data)
