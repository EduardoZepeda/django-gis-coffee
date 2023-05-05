from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from accounts.api.serializers import UserUsernameSerializer

from ..models import CoffeeBag, Shop


class FeedShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ["id", "name"]


class ShopSerializer(GeoFeatureModelSerializer):
    likes = UserUsernameSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    liked = serializers.BooleanField(read_only=True)
    reviewed = serializers.BooleanField(read_only=True)
    lookup_field = "pk"

    class Meta:
        model = Shop
        geo_field = "location"
        fields = [
            "id",
            "name",
            "created_date",
            "location",
            "address",
            "city",
            "roaster",
            "rating",
            "likes",
            "content",
            "url",
            "likes_count",
            "liked",
            "reviewed",
        ]
        filterset_fields = ["name", "address", "content"]
        extra_kwargs = {"url": {"lookup_field": "pk"}}

    def get_queryset(self):
        return Shop.objects.all().order_by("-created_date")


class CoffeeBagSerializer(serializers.ModelSerializer):
    coffee_shop = ShopSerializer(many=True, read_only=True)

    class Meta:
        model = CoffeeBag
        fields = ["brand", "species", "origin", "coffee_shop", "url"]
        filterset_fields = ["brand", "species", "origin"]
