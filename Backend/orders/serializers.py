from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_details', 'quantity', 'price')
        read_only_fields = ('price',)

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ('id', 'user', 'items', 'total_amount', 'status', 'created_at', 'updated_at')
        read_only_fields = ('user', 'total_amount', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        request = self.context.get('request')
        validated_data['user'] = request.user
        validated_data['total_amount'] = 0
        
        order = Order.objects.create(**validated_data)
        
        total_amount = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            price = product.price
            total_amount += price * quantity
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=price
            )
        
        order.total_amount = total_amount
        order.save()
        
        return order
