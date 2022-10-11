from django.urls import path
from .views import NearbyShops, SearchShops, Home, ShopDetail, LikeCoffeeShop

urlpatterns = [
    path("<int:pk>/", ShopDetail.as_view(), name="shop_detail"),
    path("like/", LikeCoffeeShop.as_view(), name="like_shop"),
    path("search/<str:query>/", SearchShops.as_view(), name="search_shop"),
    path("new/", Home.as_view(), name="newest_coffee_shops"),
    path("api/v1/shops/@<latitude>,<longitude>,<int:radius>", NearbyShops.as_view(), name="nearby_shops"),
]