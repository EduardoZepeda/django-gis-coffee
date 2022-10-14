from django.urls import path
from .views import NearbyShops, SearchShops, Home, ShopDetail, LikeCoffeeShop, LikesByUser

urlpatterns = [
    path("<int:pk>/", ShopDetail.as_view(), name="detail"),
    path("like/", LikeCoffeeShop.as_view(), name="like"),
    path("search/<str:query>/", SearchShops.as_view(), name="search"),
    path("new/", Home.as_view(), name="newest"),
    path("likes/", LikesByUser.as_view(), name="likes"),
    path(
        "@<latitude>,<longitude>,<int:radius>/",
        NearbyShops.as_view(),
        name="nearby",
    ),
]
