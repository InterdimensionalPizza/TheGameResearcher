from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import requests
from dotenv import dotenv_values

# Create your views here.
env = dotenv_values(".env")
apikey = env.get('apikey')

class Game(APIView):
    def get(self, request, gameid):
        endpoint = f"https://www.giantbomb.com/api/game/{gameid}/?api_key={apikey}&format=json"
        response = requests.get(endpoint, headers={'User-Agent': 'user'})
        return Response(response.json())
    
class Search(APIView):
    def get(self, request, search):
        endpoint = f"https://www.giantbomb.com/api/search/?api_key={apikey}&format=json&query={search}&resources=game"
        response = requests.get(endpoint, headers={'User-Agent': 'user'})
        return Response(response.json())