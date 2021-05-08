from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from .models import User
from django.conf import settings
from .utils import create_username

@receiver(pre_save, sender=User, dispatch_uid="set_username_of_user")
def set_username(sender, instance, **kwargs):
    """
    Every time a use is saved, ensures that user has a certain username
    This method avoids users having username field set to null
    """
    if not instance.username:
        email = instance.email
        email_without_domain = email[:email.find("@")].replace("-","_").lower().strip()[:20].replace(' ','')
        username = create_username(email_without_domain)
        if User.objects.filter(username=username).exists():
            while User.objects.filter(username=username):
                username = create_username(email_without_domain)
        instance.username = username
        

# create a username when user signs up
@receiver(user_signed_up, dispatch_uid="allauth_user_signup")
def user_signed_up_(request, user, **kwargs):
    
    email = user.email
    email_without_domain = email[:email.find("@")].replace("-","_").lower().strip()[:20].replace(' ','')
    username = create_username(email_without_domain)
    
    if User.objects.filter(username=username).exists():
        while User.objects.filter(username=username):
            username = create_username(email_without_domain)
    user.username = username
    
  
    