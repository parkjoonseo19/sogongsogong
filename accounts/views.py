from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth.models import User 
from django.http import JsonResponse

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


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

@api_view(['GET'])
def check_id(request,id):
    if User.objects.filter(username=id).exists():
        return JsonResponse({'available': False})
    else:
        return JsonResponse({'available': True})