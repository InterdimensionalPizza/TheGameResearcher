from django.urls import path
from .views import SetGame

urlpatterns = [
    path('create/', SetGame.as_view(), name='create_game'),
    path('delete/<str:guid>', SetGame.as_view(), name='delete_game')
]