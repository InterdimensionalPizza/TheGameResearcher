from django.urls import path
from .views import Game, Search, Reviews

urlpatterns = [
    path('game/<str:gameid>', Game.as_view(), name='game'),
    path('search/<str:search>', Search.as_view(), name='search'),
    path('reviews/<str:gameid>', Reviews.as_view(), name='reviews')
]