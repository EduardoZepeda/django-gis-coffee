from django.urls import path
from .views import (
    CreateCoffeeShopReview,
    ReadCoffeeShopReview,
    ReadCoffeeShopReviewList,
)

urlpatterns = [
    path(
        "create/<int:coffee_shop_id>/", CreateCoffeeShopReview.as_view(), name="create"
    ),
    path("read/<int:pk>/", ReadCoffeeShopReview.as_view(), name="read"),
    path("shop/<int:coffee_shop_id>/", ReadCoffeeShopReviewList.as_view(), name="list"),
]
