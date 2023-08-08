from django.db import models
from wishlist_app.models import Wishlist

# Create your models here.
class Game(models.Model):
    game_id = models.CharField()
    title = models.CharField()
    img_url = models.CharField()
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='game')