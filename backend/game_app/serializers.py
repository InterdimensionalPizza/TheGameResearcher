from rest_framework.serializers import ModelSerializer
from .models import Game

class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'game_id', 'title', 'img_url', 'wishlist']