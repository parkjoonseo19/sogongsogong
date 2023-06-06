from django.urls import path
from accounts import views

urlpatterns = [
    path('', views.LoginView, name='LoginView'),
    path('logout/',views.logout, name='logout'),
    path('signup/',views.RegisterView, name='RegisterView'),
]