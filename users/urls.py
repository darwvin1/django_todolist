from django.urls import path
from .views import *

app_name = 'users'

urlpatterns = [
    path('', user_view, name='user_view'),
    path('login/', user_login_view, name='login'),
    path('register/', user_register_view, name='register'),
    path('set-profile/', user_set_profile_view, name='set-profile'),
]
