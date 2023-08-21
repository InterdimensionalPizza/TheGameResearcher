from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User
from wishlist_app.models import Wishlist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from .utilities import HttpOnlyToken

# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        request.data['username'] = request.data['email']
        user = User.objects.create_user(**request.data)
        wishlist = Wishlist.objects.create(user=user)
        token = Token.objects.create(user=user)
        life_time = datetime.now() + timedelta(days=7)
        format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
        response = Response({"user": {"email": user.email}}, status=HTTP_201_CREATED)
        response.set_cookie(key="token", value=token.key, httponly=True, secure=True, samesite="Lax", expires=format_life_time)
        return response
    
class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = authenticate(**request.data)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            life_time = datetime.now() + timedelta(days=7)
            format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
            response = Response({"user": {"email": user.email}})
            response.set_cookie(key="token", value=token.key, httponly=True, secure=True, samesite="Lax", expires=format_life_time)
            return response
        else:
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        
class Log_out(APIView):
    authentication_classes = [HttpOnlyToken]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        response = Response(status=HTTP_204_NO_CONTENT)
        response.delete_cookie("token")
        return response
    
class Info(APIView):
    authentication_classes = [HttpOnlyToken]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'email': request.user.email})