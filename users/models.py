from django.db import models
from django.contrib.auth.models import AbstractUser
# from todolist.models import Todo

# Create your models here.
class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profiles/', default='profiles/user.png')
