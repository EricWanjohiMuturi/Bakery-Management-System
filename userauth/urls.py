from django.urls import path
from .views import login_view

app_name = 'userauth'

urlpatterns = [
    path('login/', login_view, name="login")
]