import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
class User(AbstractUser):
    
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    university = models.ForeignKey("university.University", null=True, verbose_name=_("students"), on_delete=models.DO_NOTHING)
    
    def save(self, *args, **kwargs):
        self.username = self.username.strip().lower()
        super(User, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.username
