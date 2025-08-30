from django.urls import path #type: ignore
from .views import *

app_name = 'core'

urlpatterns = [
    path('', pos, name="home"),
    path('orders/', order_history, name="order-history"),

    #APIs
    path("api/products/", products_api, name="products_api")
]

