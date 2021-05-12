import uuid
from django.db import models
from base.models import BaseModel
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _

class Instructor(BaseModel):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    slug = models.SlugField(_(""), max_length=254)
    university = models.ManyToManyField("university.University", verbose_name=_("universities"))
    courses = models.ManyToManyField("course.Course", verbose_name=_("courses"))
    
    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)
    
    def save(self, *args, **kwargs):
        self.first_name = self.first_name.strip().lower()
        self.last_name = self.last_name.strip().lower()
        if not self.slug:
            self.slug = slugify('%s %s' % (self.first_name, self.last_name))
        super(Instructor, self).save(*args, **kwargs)

