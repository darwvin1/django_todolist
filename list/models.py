from django.db import models

# Create your models here.
class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name="عنوان", max_length=300)
    is_done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)