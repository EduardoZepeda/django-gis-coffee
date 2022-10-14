from django.urls import path
from .views import FeedList

urlpatterns = [
    path("", FeedList.as_view(), name="list"),
]