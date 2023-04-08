from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.postgres.search import SearchVector
from django.core.serializers import serialize
from django.db.models import Count, Exists, OuterRef
from django.utils.decorators import method_decorator
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from feeds.utils import create_action
from utils.permissions.api_permissions import IsStaffOrReadOnly

from reviews.models import Review
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
        query = self.request.query_params.get("query")
        shops = (
            Shop.objects.all()
            .prefetch_related("likes")
            .annotate(
                likes_count=Count("likes"),  # count shop likes and add it to response
                # Check if the current user has liked the shop and return it as part of the response object
                liked=Exists(
                    Shop.likes.through.objects.filter(
                        shop_id=OuterRef("pk"), user_id=self.request.user.id
                    ),
                ),
                # check if the current user has liked the and return it as part of the response object
                reviewed=Exists(
                    Review.objects.filter(
                        shop_id=OuterRef("pk"), user_id=self.request.user.id
                    ),
                ),
            )
        )
        # try to convert latitude, longitude to float
        # otherwise ignore the query and return all coffee shops
        try:
            radius = int(self.request.query_params.get("radius", 50))
            longitude = float(self.request.query_params.get("longitude", "0.0"))
            latitude = float(self.request.query_params.get("latitude", "0.0"))
        except ValueError:
            return shops

        # srid is a constant, don't move it
        coordenates = Point(longitude, latitude, srid=4326)
        # if there is a query, filter results
        if query:
            shops = shops.annotate(
                search=SearchVector("name", "content", config="spanish")
            ).filter(search=query)
        # if user sets latitude and longitude, filter results again
        if float(latitude) != 0.0 and float(longitude) != 0.0:
            shops = (
                shops.annotate(distance=Distance("location", coordenates))
                .filter(distance__lte=D(km=radius))
                .order_by("distance")[0:10]
            )
        return shops

    @extend_schema(
        # extra parameters added to the schema
        parameters=[
            OpenApiParameter(
                name="longitude",
                description="User's longitude",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="latitude",
                description="User's latitude",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="radius",
                description="Radius used to search for close coffee shops",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="query",
                description="Search parameter to filter coffee shops by",
                required=False,
                type=str,
            ),
        ],
    )
    def list(self, request):
        # your non-standard behaviour
        return super().list(request)


class ShopLikesViewSet(viewsets.GenericViewSet):
    parser_classes = [JSONParser]
    lookup_field = "id"
    permission_classes = [IsAuthenticated]

    def shop_already_liked_by_user(self, shop, user):
        return shop in user.likes.all()

    @action(methods=["post"], detail=True, permission_classes=[IsAuthenticated])
    def like(self, request, id=None):
        # If shop doesn't exists return 404
        try:
            shop = Shop.objects.get(id=self.kwargs["id"])
        except Shop.DoesNotExist:
            return Response(
                {"message": "Shop not found"}, status=status.HTTP_404_NOT_FOUND
            )
        # If user already liked, return 400
        if self.shop_already_liked_by_user(shop, request.user):
            return Response(
                {"message": "You already liked this shop"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.user.likes.add(shop)
        # Create action for like event
        create_action(request.user, "liked", shop)
        return Response({}, status=status.HTTP_201_CREATED)

    @action(
        methods=["post", "delete"], detail=True, permission_classes=[IsAuthenticated]
    )
    def unlike(self, request, id=None):
        # If shop doesn't exist, return 404
        try:
            shop = Shop.objects.get(id=self.kwargs["id"])
        except Shop.DoesNotExist:
            return Response(
                {"message": "Shop not found"}, status=status.HTTP_404_NOT_FOUND
            )
        # If user hasn't liked shop, return 400
        if not self.shop_already_liked_by_user(shop, request.user):
            return Response(
                {"message": "You haven't liked this shop"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        request.user.likes.remove(shop)
        return Response({}, status=status.HTTP_200_OK)
