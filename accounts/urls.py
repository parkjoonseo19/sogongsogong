from django.urls import path
from accounts import views
from .views import *

urlpatterns = [
    path('api/login/', Login, name='login'),
    path('api/check_id/<str:id>/', views.check_id, name='check_id'),
]