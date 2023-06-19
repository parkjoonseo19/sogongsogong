from django.urls import path
from todolist import views
from .views import *

urlpatterns = [
    path('work-list/', ListDataList.as_view()),
    path('work-list/<int:pk>', ListDataDetail.as_view()),
    path('work-list/workData/',WorkDataList.as_view()),
    path('work-list/workData/<int:pk>',WorkDataDetail.as_view())
]

