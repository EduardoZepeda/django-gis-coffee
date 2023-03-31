from rest_framework import viewsets

from permissions.api_permissions import IsStaffOrReadOnly

from ..models import CoffeeBag, Shop
from .serializers import CoffeeBagSerializer, ShopSerializer


class CoffeeBagViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CoffeeBagSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        # Retrieve only current user's feed
        return CoffeeBag.objects.all()


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ShopSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        # Retrieve only current user's feed
        return Shop.objects.all()
