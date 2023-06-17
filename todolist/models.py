from django.db import models
from django.contrib.auth.models import User

class ListData(models.Model) :
    listname = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) :
        return self.listname
    
class WorkData(models.Model) :
    workName = models.CharField(max_length=100)
    workPriority =  models.IntegerField(null=True,blank=True)
    workDeadline = models.DateField(null=True,blank=True)
    completed = models.BooleanField(default=False)
    
    workList = models.ForeignKey(ListData, related_name='work_data', on_delete=models.CASCADE)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) :
        return self.workName