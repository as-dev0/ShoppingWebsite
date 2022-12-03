from  django.http import JsonResponse
from .models import Product, CartItem, Order, OrderItem, BillingAddress, ShippingAddress, Payment
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer, BillingAddressSerializer, ShippingAddressSerializer, PaymentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import ast

@api_view(['GET', 'POST'])
def product_list(request, format=None):

    if request.method == 'GET':

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)


@api_view(['GET'])
def product_detail(request, id, format=None):

    try:
        product = Product.objects.get(pk=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)


@api_view(['GET'])
def cartitem_list(request, userid, format=None):

    # Get all cart items of user whose id is userid
    if request.method == 'GET':
        cartitems = CartItem.objects.all().filter(userid=userid)
        print("Get request for all cart items of user with userid:%s. Cart contains %s items" % (userid, len(cartitems)))
        serializer = CartItemSerializer(cartitems, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def cartitem_detail(request, userid, productid, format=None):

    cartitems = CartItem.objects.all().filter(userid=userid)

    if request.method == 'GET':
        try:
            cartitems = cartitems.get(productid=productid)
            print("Get request for cart item with product id:%s of user with userid:%s"% 
            (productid, userid))

            serializer = CartItemSerializer(cartitems)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':

        try: 
            cartitem = cartitems.get(productid=productid)

            print("Got a request from userid:%s to update an item with product id:%s and new quantity:%s" % 
            (userid, productid, ast.literal_eval(bytes.decode(request.body))['quantity']) )

            serializer = CartItemSerializer(cartitem, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)
        
        except:

            print("Got an add request from userid:%s to add an item with product id:%s"% 
            (userid, productid))
            
            serializer = CartItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data
                ,status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        try:
            cartitems = cartitems.get(productid=productid)
            print("Got a delete request from userid:%s to delete the item with product id:%s"% 
            (userid, productid))
            cartitems.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def order_list(request, userid, format=None):

    if request.method == 'GET':

        orders = Order.objects.all().filter(userid=userid)
        print("Get request for all orders of user with userid:%s. %s orders retrieved" % (userid, len(orders)))
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        print("Post request for user with userid:%s." % (userid))

        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE'])
def order_detail(request, userid, orderid, format=None):

    if request.method == 'GET':

        order = Order.objects.all().get(pk=orderid)
        print("Get request for order with orderid:%s, of user with userid:%s " % (orderid, userid))
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    if request.method == "DELETE":

        print("DELETE request for user with userid:%s." % (userid))
        order = Order.objects.get(pk=orderid)
        order.canceled = True
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def orderitem_list(request, userid, orderid, format=None):

    if request.method == 'GET':

        orders = OrderItem.objects.all().filter(orderid=orderid)
        print("Get request for all orders items in order %s of user with userid:%s. %s orders retrieved" % (orderid, userid, len(orders)))
        serializer = OrderItemSerializer(orders, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        print("Post request for an order item in order %s of user with userid:%s." % (orderid, userid))

        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)



@api_view(['GET', 'POST'])
def billingaddress_list(request, userid, format=None):

    print("In billingaddress_list")

    if request.method == 'GET':
        print("Get request for all billing addresses of user with userid:%s." % ( userid))

        addresses = BillingAddress.objects.all().filter(userid=userid)
        serializer = BillingAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        print("Post request for a billing address of user with userid:%s." % ( userid))

        serializer = BillingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def billingaddress_detail(request, userid, billingid, format=None):

    if request.method == 'GET':
        try:
            print("Get request for billing address of user with userid:%s and billingid:%s." % ( userid, billingid))
            addresses = BillingAddress.objects.all().get(pk=billingid)
            serializer = BillingAddressSerializer(addresses)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':

        print("Put request for billing address of user with userid:%s and billingid:%s." % ( userid, billingid))
        address = BillingAddress.objects.all().get(pk=billingid)
        serializer = BillingAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':

        print("Delete request for billing address of user with userid:%s and billingid:%s." % ( userid, billingid))
        address = BillingAddress.objects.all().get(pk=billingid)
        address.deleted = True
        address.save()
        serializer = BillingAddressSerializer(address)
        return Response(serializer.data
            ,status=status.HTTP_201_CREATED)



@api_view(['GET', 'POST'])
def shippingaddress_list(request, userid, format=None):

    if request.method == 'GET':
        print("Get request for all shipping addresses of user with userid:%s." % ( userid))

        addresses = ShippingAddress.objects.all().filter(userid=userid)
        serializer = ShippingAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        print("Post request for a shipping address of user with userid:%s." % ( userid))

        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def shippingaddress_detail(request, userid, shippingid, format=None):

    if request.method == 'GET':
        try:
            print("Get request for shipping address of user with userid:%s and shippingid:%s." % ( userid, shippingid))

            addresses = ShippingAddress.objects.all().get(pk=shippingid)
            serializer = ShippingAddressSerializer(addresses)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':

        print("Put request for shipping address of user with userid:%s and shippingid:%s." % ( userid, shippingid))
        address = ShippingAddress.objects.all().get(pk=shippingid)
        serializer = ShippingAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':

        print("Delete request for shipping address of user with userid:%s and shipping:%s." % ( userid, shippingid))
        address = ShippingAddress.objects.all().get(pk=shippingid)
        address.deleted = True
        address.save()
        serializer = ShippingAddressSerializer(address)
        return Response(serializer.data
            ,status=status.HTTP_201_CREATED)



@api_view(['GET', 'POST'])
def payment_list(request, userid, format=None):

    if request.method == 'GET':
        print("Get request for all payment methods of user with userid:%s." % ( userid))

        payments = Payment.objects.all().filter(userid=userid)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        print("Post request for a payment method of user with userid:%s." % ( userid))

        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def payment_detail(request, userid, paymentid, format=None):

    if request.method == 'GET':
        try:
            print("Get request for payment method of user with userid:%s and paymentid:%s." % ( userid, paymentid))

            payment = Payment.objects.all().get(pk=paymentid)
            serializer = PaymentSerializer(payment)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':

        print("Put request for payment method of user with userid:%s and paymentid:%s." % ( userid, paymentid))
        payment = Payment.objects.all().get(pk=paymentid)
        serializer = PaymentSerializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data
            ,status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':

        print("Delete request for payment method of user with userid:%s and paymentid:%s." % ( userid, paymentid))
        payment = Payment.objects.all().get(pk=paymentid)
        payment.deleted = True
        payment.save()
        serializer = PaymentSerializer(payment)

        return Response(serializer.data
            ,status=status.HTTP_201_CREATED)
