from django.db import models

class Product(models.Model):

    name = models.CharField(max_length=200)
    price = models.IntegerField()
    description = models.CharField(max_length=3000)
    imageurl = models.CharField(max_length=1000)
    rating = models.IntegerField()
    quantityAvailable = models.IntegerField(default=0)

class CartItem(models.Model):

    userid = models.IntegerField(default=0)
    productid = models.IntegerField()
    quantity = models.IntegerField()

class Order(models.Model):

    userid = models.IntegerField(default=0)
    total = models.IntegerField()
    date = models.CharField(max_length=30)
    billingid = models.IntegerField(default=1)
    shippingid = models.IntegerField(default=1)
    paymentid = models.IntegerField(default=1)
    canceled = models.BooleanField(default=False)

class OrderItem(models.Model):

    orderid = models.IntegerField()
    productid = models.IntegerField()
    quantity = models.IntegerField()

class BillingAddress(models.Model):

    userid = models.IntegerField()
    name = models.CharField(max_length=100, default = "")
    streetAddress1 = models.CharField(max_length=100)
    streetAddress2 = models.CharField(max_length=100, default="")
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zipCode = models.CharField(max_length=15)
    default = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)

class ShippingAddress(models.Model):

    userid = models.IntegerField()
    name = models.CharField(max_length=100, default = "")
    streetAddress1 = models.CharField(max_length=100)
    streetAddress2 = models.CharField(max_length=100, default="")
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zipCode = models.CharField(max_length=15)
    default = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)

class Payment(models.Model):

    userid = models.IntegerField()
    name = models.CharField(max_length=100, default = "")
    cardType = models.CharField(max_length=50, default="")
    cardNumber = models.IntegerField()
    expirationMonth = models.IntegerField()
    expirationYear = models.IntegerField()
    cvv = models.IntegerField()
    default = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
