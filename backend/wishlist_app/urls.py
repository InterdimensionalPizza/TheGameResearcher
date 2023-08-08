from django.urls import path
from .views import Entire_wishlist

urlpatterns = [
    path('', Entire_wishlist.as_view(), name='entire_wishlist')
]