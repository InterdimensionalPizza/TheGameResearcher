from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import Game
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

class SetGame(APIView):
    authentication_classes = [HttpOnlyToken]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        wishlist = request.user.wishlist
        game_id = request.data.get('game_id')
        guid = request.data.get('guid')
        title = request.data.get('title')
        img_url = request.data.get('img_url')
        game = Game.objects.create(wishlist=wishlist, game_id=game_id, title=title, img_url=img_url, guid=guid)
        serializedgame = GameSerializer(game)
        return Response({"gamedata": serializedgame.data}, status=HTTP_201_CREATED)

    def delete(self, request, guid):
        request.user.wishlist.game.filter(guid=guid).delete()
        return Response(status=HTTP_204_NO_CONTENT)
