from django.db import models
from base.models import BaseModel
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _

class University(BaseModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(_(""), max_length=254)
    country = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=50, null=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(University, self).save(*args, **kwargs)
            
                    
                            
                        
    

