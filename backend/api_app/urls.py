from django.urls import path
from .views import Game, Search

urlpatterns = [
    path('game/<str:gameid>', Game.as_view(), name='game'),
    path('search/<str:search>', Search.as_view(), name='search')
]