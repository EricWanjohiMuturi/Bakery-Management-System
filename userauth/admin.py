from django.contrib import admin
from .models import StaffRole, User

@admin.register(StaffRole)
class StaffRoleAdmin(admin.ModelAdmin):
    list_display = ("id", "title")   # adjust fields as needed

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email")