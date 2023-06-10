from django.urls import path
from todolist import views

urlpatterns = [
    path('',views.ListAndWork, name='ListAndWork'),
    path('workMangement/', views.test, name='test'),
    path('addList/', views.addList, name='addList'),path('workdata/set_priority/<int:pk>/', SetPriorityView.as_view(), name='set_priority'),
    path('workdata/set_deadline/<int:pk>/', SetDeadlineView.as_view(), name='set_deadline'),
    path('workdata/sort/<int:pk>/<str:sort_by>/', SortWorkDataView.as_view(), name='sort_workdata'),
    
]