import uuid
from django.db import models
from base.models import BaseModel
from django.core.validators import MaxLengthValidator
from django.utils.translation import ugettext_lazy as _

class Course(BaseModel):
    
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    code = models.CharField(max_length=50)
    description = models.TextField(validators=[MaxLengthValidator(1000)])
    university = models.ForeignKey("university.University", verbose_name=_("courses"), null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return '%s - %s' % (self.code, self.university.name)

    def save(self, *args, **kwargs):
        self.code = self.code.replace(' ', '').upper()
        super(Course, self).save(*args, **kwargs)
        
class Review(BaseModel):
    
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    course = models.ForeignKey(Course, verbose_name=_("review course"), on_delete=models.CASCADE)
    author = models.ForeignKey("user.User", verbose_name=_("review author"), related_name="reviews", on_delete=models.CASCADE)
    likes = models.ManyToManyField("user.User", verbose_name=_("review likes"), related_name="review_likes")
    dislikes = models.ManyToManyField("user.User", verbose_name=_("review dislikes"), related_name="review_dislikes")
    content = models.TextField(validators=[MaxLengthValidator(2500)])
    
    def __str__(self):
        return 'Review by %s on %s' % (self.user.username, self.course.code)
    
    
        
    