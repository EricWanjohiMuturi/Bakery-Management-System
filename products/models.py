from django.db import models #type:ignore
from cloudinary.models import CloudinaryField #type:ignore
from userauth.models import User 

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.title
    
STATUS = (
    ("draft","Draft"),
    ("published","Published"),
)
    
class Product(models.Model):
    title = models.CharField(max_length=20)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="category")
    image  = CloudinaryField('image', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    product_status = models.CharField(choices=STATUS, max_length=10, default="draft")
    qty = models.IntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title

PAYMENT = (
    ("Cash", "CASH"),
    ("Mpesa", "M-PESA"),
)

class Order(models.Model):
    order_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    customer = models.CharField(max_length=100, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    totalcost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    mode_payment = models.CharField(choices=PAYMENT, max_length=20, default="Mpesa")
    code = models.CharField(max_length=50, blank=True, null=True)
    paid_status = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"Order {self.id} - {self.customer}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey("product", on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product} (x{self.qty})"

