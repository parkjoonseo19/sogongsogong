from django.shortcuts import get_object_or_404, render
from .models import ListData, WorkData
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

def ListAndWork(request) :
    lists = ListData.objects.all()
    return render(request,'index.html',{'lists':lists})

# front 연결 시도해 본거라 나중에 변경하겠습니다 
def test(request) :
    return render(request, 'todolist/work-management.html')

@csrf_exempt
@login_required
def addList(request) :
    if request.method == 'POST':
        listname = request.POST.get('listname')
        user = request.user
        new_list = ListData.objects.create(listname=listname, user=user)
        return JsonResponse({'status': 'success', 'new_list_listname': new_list.listname})
    return JsonResponse({'status': 'error'})

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

def sortWorkPriority(request, pk):
    worklist = get_object_or_404(ListData, pk=pk)
    workdata_list = worklist.workdata_set.order_by('priority')

    context = {'worklist': worklist, 'workdata_list': workdata_list}

    return render(request, 'workdata.html', context)

def sortWorkDeadline(request, pk):
    worklist = get_object_or_404(ListData, pk=pk)
    workdata_list = worklist.workdata_set.order_by('deadline')

    context = {'worklist': worklist, 'workdata_list': workdata_list}

    return render(request, 'workdata.html', context)