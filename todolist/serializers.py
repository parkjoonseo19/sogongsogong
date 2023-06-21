from rest_framework import serializers
from todolist.models import ListData, WorkData


class WorkDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkData
        fields = ['workName', 'workPriority', 'workDeadline', 'completed', 'workList','user','pk']

class ListDataSerializer(serializers.ModelSerializer):
    work_data = WorkDataSerializer(many=True, required=False) 
    class Meta:
        model = ListData
        fields = ['listname','work_data','user','pk']