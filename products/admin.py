from django.contrib import admin
from .models import category, product, order

# Register your models here.
admin.site.register(product)
admin.site.register(category)
admin.site.register(order)