from django.shortcuts import render
from .models import ListData
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