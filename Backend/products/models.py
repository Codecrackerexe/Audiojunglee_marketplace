from django.db import models
from accounts.models import User
from categories.models import Category

# Create your models here.
class AudioFile(models.Model):
    file = models.FileField(upload_to='audio_files/')
    duration = models.FloatField(blank=True, null=True)
    file_size = models.IntegerField(blank=True, null=True)
    format = models.CharField(max_length=10, blank=True, null=True)
    sample_rate = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Audio File {self.id}"

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    audio_file = models.OneToOneField(AudioFile, on_delete=models.CASCADE, related_name='product')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title