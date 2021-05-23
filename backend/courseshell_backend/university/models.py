import uuid
from django.db import models
from base.models import BaseModel
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import ArrayField

class University(BaseModel):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(_(""), max_length=254)
    country = models.CharField(max_length=200, null=True)
    alpha_two_code = models.CharField(max_length=2, null=True)
    state = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=50, null=True)
    web_pages = ArrayField(
        models.CharField(max_length=254, blank=True),
        size=10,
        null=True,
        blank=True
    )
    domains = ArrayField(
        models.CharField(max_length=254, blank=True),
        size=10,
        null=True,
        blank=True,
    )
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.strip()
        if not self.slug:
            self.slug = slugify(self.name.lower())
        super(University, self).save(*args, **kwargs)
            
                    
                            
                        
    

