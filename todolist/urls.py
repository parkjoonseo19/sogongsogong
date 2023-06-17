from django.urls import path
from todolist import views
from .views import *

urlpatterns = [
    path('',views.ListAndWork, name='ListAndWork'),
    path('workMangement/', views.test, name='test'),
    path('addList/', views.addList, name='addList'),
    path('worklist/<int:worklist_id>/workdata/<int:workdata_id>/workdetail/', views.getWorkdetail, name='getWorkdetail'),
    path('workdata/sortWorkPriority/<int:worklist_id>/', views.sortWorkPriority, name='sortWorkPriority'),
    path('workdata/sortWorkDeadline/<int:worklist_id>/', views.sortWorkDeadline, name='sortWorkDeadline'),
]

# path('mark_completed/<int:workdata_id>/', views.completedWork, name='completedWork'),
