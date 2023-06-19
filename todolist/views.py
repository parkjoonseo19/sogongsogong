from django.shortcuts import get_object_or_404, render
from .models import ListData, WorkData
from todolist.serializers import ListDataSerializer, WorkDataSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# REST API 이용 - 목록 
class ListDataList(APIView) :
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None) :
        listData = ListData.objects.all()
        # listData = ListData.objects.filter(user=request.user)
        serializer = ListDataSerializer(listData, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None) :
        serializer = ListDataSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListDataDetail(APIView) :
    def get_object(self, pk) :
        try :
            return ListData.objects.get(pk=pk)
        except :
            return Response(status=status.HTTP_404_NOT_FOUND)
    def get(self, request, pk, format=None) :
        listData = self.get_object(pk)
        serializer = ListDataSerializer(listData)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None) :
        listData = self.get_object(pk)
        serializer = ListDataSerializer(listData, data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None) :
        listData = self.get_object(pk)
        listData.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# REST API 이용 - 작업 
class WorkDataList(APIView) :
    def get(self, request, format=None) :
        workData = WorkData.objects.all()
        serializer = WorkDataSerializer(workData, many=True)
        return Response(serializer.data)
    def post(self, request, format=None) :
        serializer = WorkDataSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkDataDetail(APIView) :
    def get_object(self, pk) :
        try :
            return WorkData.objects.get(pk=pk)
        except :
            return Response(status=status.HTTP_404_NOT_FOUND)
    def get(self, request, pk, format=None) :
        workData = self.get_object(pk)
        serializer = WorkDataSerializer(workData)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None) :
        workData = self.get_object(pk)
        serializer = WorkDataSerializer(workData, data=request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None) :
        workData = self.get_object(pk)
        workData.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



        

'''
class SetPriorityView(View):
    def post(self, request, pk):
        workdata = get_object_or_404(WorkData, pk=pk)
        priority = request.POST.get('priority')
        workdata.priority = priority
        workdata.save()
        return JsonResponse({'priority': workdata.priority})

class SetDeadlineView(View):
    def post(self, request, pk):
        workdata = get_object_or_404(WorkData, pk=pk)
        deadline = request.POST.get('deadline')
        workdata.deadline = deadline
        workdata.save()
        return JsonResponse({'priority': workdata.priority})

class SortWorkDataView(View):
    def get(self, request, pk, sort_by):
        worklist = get_object_or_404(WorkList, pk=pk)
        if sort_by == 'priority':
            workdata_list = worklist.workdata_set.order_by('priority')
        elif sort_by == 'deadline':
            workdata_list = worklist.workdata_set.order_by('deadline')
        else:
            workdata_list = worklist.workdata_set.all()
        return render(request, 'Workdata.html', {'worklist': worklist, 'workdata_list': workdata_list})

'''

def SetPriorityView(request, workdata_id):
    workdata = get_object_or_404(WorkData, pk=workdata_id)
    priority = request.POST.get('priority')

    workdata.priority = priority
    workdata.save()

    return JsonResponse({'priority': workdata.priority})


def SetDeadlineView(request, workdata_id):
    workdata = get_object_or_404(WorkData, pk=workdata_id)
    deadline = request.POST.get('deadline')

    workdata.deadline = deadline
    workdata.save()

    return JsonResponse({'deadline': workdata.deadline})

#ajax에서 완료 설정하기로 함
'''
def completedWork(request, workdata_id):
    workdata = get_object_or_404(WorkData, pk=workdata_id)

    workdata.completed = True
    workdata.save()

    return JsonResponse({'completed': workdata.completed})
'''

# 작업명, 마감기한, 우선순위 한번에 받는 메서드...
def getWorkdetail(request, workdata_id):
    workdata = get_object_or_404(WorkData, pk=workdata_id)

    if request.method == 'POST':
        workdata.name = request.POST.get('name')
        workdata.deadline = request.POST.get('deadline')
        workdata.priority = request.POST.get('priority')
        workdata.save()

    return render(request, 'work-management.html', {'workdata': workdata})



def sortWorkPriority(request, pk):
    worklist = get_object_or_404(ListData, pk=worklist.id)
    workdata_list = worklist.WorkData_set.order_by('priority')

    context = {'worklist': worklist, 'workdata_list': workdata_list}

    return render(request, 'workdata.html', context)

def sortWorkDeadline(request, pk):
    worklist = get_object_or_404(ListData, pk=worklist.id)
    workdata_list = worklist.WorkData_set.order_by('deadline')

    context = {'worklist': worklist, 'workdata_list': workdata_list}

    return render(request, 'workdata.html', context)

#api버전으로 정렬들 각각 재작성
@api_view(['GET'])
def sortwithpriority(request, pk):
    try:
        workdata = WorkData.objects.filter(worklist_id=pk).order_by('workPriority')
        serializer = WorkDataSerializer(workdata, many=True)
        return Response(serializer.data)
    except WorkData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def sortwithdeadline(request, pk):
    try:
        workdata = WorkData.objects.filter(worklist_id=pk).order_by('workDeadline')
        serializer = WorkDataSerializer(workdata, many=True)
        return Response(serializer.data)
    except WorkData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

