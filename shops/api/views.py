from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action

from utils.permissions.api_permissions import IsStaffOrReadOnly

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


class ShopLikesViewSet(viewsets.GenericViewSet):
    parser_classes = [JSONParser]
    lookup_field = "id"
    permission_classes = [IsAuthenticated]

    def shop_liked(shop, user):
        return shop in user.likes.all()

    @action(methods=["post"], detail=True, permission_classes=[IsAuthenticated])
    def like(self, request, id=None):
        try:
            shop = Shop.objects.get(id=self.kwargs["id"])
        except Shop.DoesNotExist:
            return Response(
                {"message": "Shop not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if self.shop_liked(shop, request.user):
            return Response(
                {"message": "You already liked this shop"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.user.likes.add(shop)
        return Response({}, status=status.HTTP_201_CREATED)

    @action(
        methods=["post", "delete"], detail=True, permission_classes=[IsAuthenticated]
    )
    def unlike(self, request, id=None):
        try:
            shop = Shop.objects.get(id=self.kwargs["id"])
        except Shop.DoesNotExist:
            return Response(
                {"message": "Shop not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if not self.shop_liked(shop, request.user):
            return Response(
                {"message": "You haven't liked this shop"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.user.likes.remove(shop)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
