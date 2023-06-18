from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth.models import User 
from django.http import JsonResponse

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# 로그인도 다 리액트로 켜야할 것 같아서 수정함니다 
@api_view(['POST'])
def Login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user is None:
        return Response({'error': 'Invalid login credentials'})
    
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({'token': token.key})


@api_view(['POST'])
def user_register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=201)

def check_id(request, id):
    if User.objects.filter(username=id).exists():
        return JsonResponse({'available': False})
    else:
        return JsonResponse({'available': True})

'''
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
'''