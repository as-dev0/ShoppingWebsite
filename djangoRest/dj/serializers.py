from rest_framework import serializers
from .models import Product, CartItem, Order, OrderItem,BillingAddress, ShippingAddress, Payment

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'imageurl', 'description', 'rating', 'quantityAvailable']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'userid', 'productid', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'userid', 'total', 'date', 'billingid', 'shippingid', 'paymentid', 'canceled']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'orderid', 'productid', 'quantity']

class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        fields = ['id', 'name', 'userid', 'streetAddress1', 'streetAddress2','city', 'state', 'zipCode', 'deleted']

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['id', 'name', 'userid', 'streetAddress1', 'streetAddress2','city', 'state', 'zipCode', 'deleted']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'name', 'userid', 'cardType', 'cardNumber', 'expirationMonth','expirationYear', 'cvv', 'deleted']