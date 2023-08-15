from django.urls import path
from .views import Game, Search, Reviews

urlpatterns = [
    path('game/<str:guid>', Game.as_view(), name='game'),
    path('search/<str:search>', Search.as_view(), name='search'),
    path('reviews/<str:game_id>', Reviews.as_view(), name='reviews')
]