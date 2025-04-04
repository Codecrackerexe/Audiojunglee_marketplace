from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    
    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    audio_file = models.FileField(upload_to='audio_files/', null=True, blank=True)
    
    def __str__(self):
        return self.title

class AudioMetadata(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='audio_metadata')
    duration = models.FloatField(null=True, blank=True)  # Duration in seconds
    sample_rate = models.IntegerField(null=True, blank=True)  # Sample rate in Hz
    bit_rate = models.IntegerField(null=True, blank=True)  # Bit rate in kbps
    file_format = models.CharField(max_length=50, null=True, blank=True)  # e.g., 'mp3', 'wav'
    channels = models.IntegerField(null=True, blank=True)  # Number of audio channels
    file_size = models.IntegerField(null=True, blank=True)  # Size in bytes
    
    def __str__(self):
        return f"Audio metadata for {self.product.title}"

