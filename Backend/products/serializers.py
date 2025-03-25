from rest_framework import serializers
from .models import Product, AudioFile, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ['id', 'file', 'duration', 'file_size', 'format', 'uploaded_at']

class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.ListField(child=serializers.CharField(), write_only=True)
    categories_info = CategorySerializer(source='categories', many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'categories', 'categories_info', 'audio_file', 'seller', 'is_active', 'created_at']
        read_only_fields = ['seller']
    
    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        product = Product.objects.create(
            seller=self.context['request'].user,
            **validated_data
        )
        
        # Handle categories
        for category_name in categories_data:
            category, created = Category.objects.get_or_create(name=category_name)
            product.categories.add(category)
        
        return product
    
    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', None)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update categories if provided
        if categories_data is not None:
            instance.categories.clear()
            for category_name in categories_data:
                category, created = Category.objects.get_or_create(name=category_name)
                instance.categories.add(category)
        
        return instance