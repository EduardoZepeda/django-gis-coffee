from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from accounts.api.serializers import UserUsernameSerializer

from ..models import CoffeeBag, Shop


class ShopSerializer(GeoFeatureModelSerializer):
    likes = UserUsernameSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        geo_field = "location"
        fields = [
            "id",
            "name",
            "location",
            "address",
            "city",
            "roaster",
            "rating",
            "likes",
            "content",
            "url",
        ]
        filterset_fields = ["name", "address", "content"]


class CoffeeBagSerializer(serializers.ModelSerializer):
    coffee_shop = ShopSerializer(many=True, read_only=True)

    class Meta:
        model = CoffeeBag
        fields = ["brand", "species", "origin", "coffee_shop", "url"]
        filterset_fields = ["brand", "species", "origin"]
