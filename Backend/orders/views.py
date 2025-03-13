from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from .permissions import IsOrderOwner

# Create your views here.
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOrderOwner]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
