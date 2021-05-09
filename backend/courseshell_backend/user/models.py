import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    uuid = models.UUIDField(default = uuid.uuid4, unique=True, editable=False)
    
    def save(self, *args, **kwargs):
        self.username = self.username.strip().lower()
        super(User, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.username
