from django.db import models #type:ignore
from cloudinary.models import CloudinaryField #type:ignore
from userauth.models import User 

# Create your models here.
class category(models.Model):
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
    
class product(models.Model):
    title = models.CharField(max_length=20)
    category = models.ForeignKey(category, on_delete=models.SET_NULL, null=True, related_name="category")
    image  = CloudinaryField('image', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    product_status = models.CharField(choices=STATUS, max_length=10, default="draft")
    qty = models.IntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title
    
class order(models.Model):
    product = models.ForeignKey(product, on_delete=models.SET_NULL, blank=True, null=True)
    order_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    qty = models.IntegerField()
    totalcost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    paid_status = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Orders"
