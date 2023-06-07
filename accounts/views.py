from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth.models import User 

def login(request) :
    if request.method == 'POST' :
        inputID = request.POST['inputID']
        inputPW = request.POST['inputPW']
        user = auth.authenticate(request, username=inputID, password=inputPW) 
        if user is not None : 
            auth.login(request, user) 
            return redirect('ListAndWork')
        else: # None (존재하지 않는 회원) 
            error_message = '존재하지 않는 회원입니다.'
            return render(request, 'accounts/login.html',{'error_message':error_message})
    else :
        return render(request, 'accounts/login.html')

def logout(requset) :
    auth.logout(requset)
    return redirect('login')

def register(request) :
    if request.method == 'POST':
        if 'checkIDdup' in request.POST :
            if User.objects.filter(username=request.POST['inputRegID']).exists(): 
                id_error_message = '이미 사용중인 ID 입니다.'
                return render(request, 'accounts/register.html', {'id_error_message': id_error_message})
            else :
                id_error_message = '사용가능한 ID입니다.'
                return render(request, 'accounts/register.html', {'id_error_message': id_error_message})
        elif 'saveuser' in request.POST :
            if request.POST['inputRegPW'] == request.POST['repeat']:
                new_user = User.objects.create_user(username = request.POST['inputRegID'], password = request.POST['inputRegPW']) 
                auth.login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
                return redirect('ListAndWork')
            else :
                pwd_error_message = '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
                return render(request, 'accounts/register.html', {'pwd_error_message': pwd_error_message})
    return render(request, 'accounts/register.html')