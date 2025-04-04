from rest_framework import serializers
from .models import Product, AudioMetadata, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class AudioMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioMetadata
        fields = ['duration', 'sample_rate', 'bit_rate', 'file_format', 'channels', 'file_size']

class ProductSerializer(serializers.ModelSerializer):
    audio_details = AudioMetadataSerializer(source='audio_metadata', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category', 'created_at', 
                 'updated_at', 'owner', 'audio_file', 'audio_details']

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'description', 'price', 'category', 'audio_file']

