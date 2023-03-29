from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from permissions.api_permissions import ReadOnly
from ..models import Shop, CoffeeBag
from accounts.api.serializers import UserPrivateSerializer

class ShopSerializer(serializers.HyperlinkedModelSerializer):
    likes = UserPrivateSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ['name', 'location', 'address', 'city', 'roaster', 'rating', 'likes', 'content', 'url']

class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ShopSerializer
    permission_classes = []

    def get_queryset(self):
        # Retrieve only current user's feed
        return Shop.objects.all()


class CoffeeBagSerializer(serializers.ModelSerializer):
    coffee_shop = ShopSerializer(many=True, read_only=True)

    class Meta:
        model = CoffeeBag
        fields = ['brand', 'species', 'origin', 'coffee_shop', 'url']

class CoffeeBagViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoffeeBagSerializer
    permission_classes = []

    def get_queryset(self):
        # Retrieve only current user's feed
        return CoffeeBag.objects.all()