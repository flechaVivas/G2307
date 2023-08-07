from django.urls import path, include
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
]

# from rest_framework import routers
# from .views import *

# router = routers.DefaultRouter()
# router.register(f'usuarios', UsuarioView, 'usuarios')

# urlpatterns = [
#     path('api/v1', include(router.urls)),
# ]