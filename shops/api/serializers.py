from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

from accounts.api.serializers import UserUsernameSerializer

from ..models import CoffeeBag, Shop


class ShopIdSerializer(serializers.Serializer):
    # Please make sure ids are integers
    id = serializers.IntegerField()

    def validate_id(self, value):
        if Shop.objects.filter(id=value).exists():
            return value
        raise serializers.ValidationError("Shop doesn't exist")


class ShopSerializer(serializers.HyperlinkedModelSerializer):
    likes = UserUsernameSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
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


class CoffeeBagSerializer(serializers.ModelSerializer):
    coffee_shop = ShopSerializer(many=True, read_only=True)

    class Meta:
        model = CoffeeBag
        fields = ["brand", "species", "origin", "coffee_shop", "url"]
