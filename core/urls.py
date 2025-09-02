from django.urls import path #type: ignore
from .views import *
from products.views import create_order

app_name = 'core'

urlpatterns = [
    path('', pos, name="home"),
    path('orders/', order_history, name="order-history"),

    #APIs
    path("api/products/", products_api, name="products_api"),
    path("api/orders/", create_order, name="create_order")
]

