from django.urls import path
from accounts import views
from .views import *

urlpatterns = [
    # path('', views.login, name='login'),
    # path('logout/',views.logout, name='logout'),
    # path('signup/',views.register, name='register'),
    
    path('api/login/', Login, name='login'),
    path('api/register/', user_register),
    path('api/check_id/<str:id>/', views.check_id, name='check_id'),
]