from django.urls import path
from .views import NearbyShops, SearchShops, Home, ShopDetail

urlpatterns = [
    path("api/v1/shops/@<latitude>,<longitude>,<int:radius>", NearbyShops.as_view(), name="nearby_shops"),
    path("shops/search/<str:query>", SearchShops.as_view(), name="search_shop"),
    path("new-cafes/", Home.as_view(), name="newest_coffee_shops"),
    path("shops/<int:pk>", ShopDetail.as_view(), name="shop_detail"),
]