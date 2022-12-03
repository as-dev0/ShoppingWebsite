from django.contrib import admin
from .models import Product, CartItem, Order, OrderItem, BillingAddress, ShippingAddress, Payment

admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(BillingAddress)
admin.site.register(ShippingAddress)
admin.site.register(Payment)
