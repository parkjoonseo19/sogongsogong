from django.db import models
from django.contrib.auth.models import User

class ListData(models.Model) :
    listname = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) :
        return self.listname