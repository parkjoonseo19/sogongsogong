from django.shortcuts import render

def ListAndWork(request) :
    return render(request,'index.html')

def test(request) :
    return render(request, 'todolist/work-management.html')