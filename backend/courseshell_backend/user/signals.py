from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from allauth.account.signals import user_signed_up, email_confirmed, password_reset
from .models import User
from django.conf import settings
from .utils import create_username


# create a username when user signs up
@receiver(user_signed_up, dispatch_uid="allauth_user_signup")
def user_signed_up_(request, user, **kwargs):
    
    email = user.email
    email_without_domain = email[:email.find("@")].replace("-","_").lower().strip()[:20].replace(' ','')
    username = create_username(email)
    
    if User.objects.filter(username=username).count() > 1:
        while User.objects.filter(username=username):
            username = create_username(email)
        user.username = username
        user.save()
  
    
    