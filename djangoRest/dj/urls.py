"""dj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dj import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/products/', views.product_list, name='products'),
    path('api/products/<int:id>', views.product_detail, name='product'),

    path('api/cartitemlist/<int:userid>', views.cartitem_list),
    path('api/cartitem/<int:userid>/<int:productid>', views.cartitem_detail),

    path('api/orders/<int:userid>', views.order_list), # get and post
    path('api/orders/<int:userid>/<int:orderid>', views.order_detail), # delete
    path('api/orderitem/<int:userid>/<int:orderid>', views.orderitem_list),

    path('api/billingaddresses/<int:userid>', views.billingaddress_list),
    path('api/billingaddress/<int:userid>/<int:billingid>', views.billingaddress_detail),

    path('api/shippingaddresses/<int:userid>', views.shippingaddress_list),
    path('api/shippingaddress/<int:userid>/<int:shippingid>', views.shippingaddress_detail),

    path('api/paymentmethods/<int:userid>', views.payment_list),
    path('api/paymentmethod/<int:userid>/<int:paymentid>', views.payment_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)