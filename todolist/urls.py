from django.urls import path
from todolist import views

urlpatterns = [
    path('',views.ListAndWork, name='ListAndWork')
]