from django.db import models
from base.models import BaseModel
from django.core.validators import MaxLengthValidator
from django.utils.translation import ugettext_lazy as _

class Course(BaseModel):
    code = models.CharField(max_length=50)
    description = models.TextField(validators=[MaxLengthValidator(1000)])
    university = models.ForeignKey("university.University", verbose_name=_("courses"), null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return '%s - %s' % (self.code, self.university)

    def save(self, *args, **kwargs):
        self.code = self.code.replace(' ', '').upper()
        super(User, self).save(*args, **kwargs)
    