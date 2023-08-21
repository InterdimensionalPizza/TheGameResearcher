from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Wishlist
from game_app.models import Game
from game_app.serializers import GameSerializer
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
from user_app.utilities import HttpOnlyToken

# Create your views here.

class Entire_wishlist(APIView):
    authentication_classes = [HttpOnlyToken]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        games = request.user.wishlist.game.all()
        serializedgames = GameSerializer(games, many=True)
        return Response(serializedgames.data)