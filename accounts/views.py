from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth.models import User 
from django.http import JsonResponse

def login(request):
    if request.method == 'POST':
        inputID = request.POST.get('inputID')
        inputPW = request.POST.get('inputPW')
        user = auth.authenticate(request, username=inputID, password=inputPW)
        
        if user is not None:
            auth.login(request, user)
            return JsonResponse({'is_authenticated': True})
        else:
            return JsonResponse({'is_authenticated': False})

    return render(request, 'accounts/login.html')

def logout(requset) :
    auth.logout(requset)
    return redirect('login')

def register(request) :
    if request.method == 'POST':
        if 'checkIDdup' in request.POST :
            username = request.POST.get('inputRegID')
            exists = User.objects.filter(username=username).exists()
            return JsonResponse({'exists': exists})
        elif 'saveuser' in request.POST :
            new_user = User.objects.create_user(username = request.POST['inputRegID'], password = request.POST['inputRegPW']) 
            auth.login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('ListAndWork')
        
    return render(request, 'accounts/register.html')