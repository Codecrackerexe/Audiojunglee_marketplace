from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategoryTreeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'children')
    
    def get_children(self, obj):
        children = Category.objects.filter(parent=obj)
        serializer = CategoryTreeSerializer(children, many=True)
        return serializer.data
