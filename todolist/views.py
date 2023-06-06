from django.shortcuts import render

def ListAndWorkView(request) :
    return render(request,'index.html')