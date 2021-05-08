from django.urls import path
from .views import GoogleLogin, FacebookLogin, AppleLogin, GithubLogin

urlpatterns = [
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('rest-auth/apple/', GoogleLogin.as_view(), name='apple_login'),
    path('rest-auth/github/', GoogleLogin.as_view(), name='github_login')
]

