from django.db import models #type: ignore
from django.contrib.auth.models import AbstractUser #type: ignore
from cloudinary.models import CloudinaryField #type:ignore

# Create your models here.
class StaffRole(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=20, blank=True, null=True)
    icon = CloudinaryField('image', blank=True, null=True)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=200)
    bio = models.TextField()
    role = models.ForeignKey(StaffRole, on_delete=models.SET_NULL, null=True, related_name="StaffRole")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username