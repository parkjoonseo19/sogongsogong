from django.urls import path
from todolist import views
from views import *

urlpatterns = [
    path('',views.ListAndWork, name='ListAndWork'),
    path('workMangement/', views.test, name='test'),
    path('addList/', views.addList, name='addList'),
    path('workdata/SetPriority/<int:pk>/', views.SetPriorityView, name='SetPriority'),
    path('workdata/SetDeadlineView/<int:pk>/', views.SetDeadlineView, name='SetDeadlineView'),
    path('workdata/sortWorkPriority/<int:pk>/', views.SortByPriorityView, name='sortWorkPriority'),
    path('workdata/sortWorkDeadline/<int:pk>/', views.SortByDeadlineView., name='sortWorkDeadline'),
]