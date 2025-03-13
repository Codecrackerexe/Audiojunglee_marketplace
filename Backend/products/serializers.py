from rest_framework import serializers
from .models import Product, AudioFile

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    audio_file = AudioFileSerializer(read_only=True)
    seller_username = serializers.ReadOnlyField(source='seller.username')
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'price', 'seller', 'seller_username', 
                  'category', 'category_name', 'audio_file', 'is_active', 'created_at', 'updated_at')
        read_only_fields = ('id', 'seller', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['seller'] = request.user
        return super().create(validated_data)
