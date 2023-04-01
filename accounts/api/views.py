from django.contrib.auth import get_user_model
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import mixins

from utils.permissions.api_permissions import IsRequestUser, IsStaffOrReadOnly
from feeds.utils import create_action

from ..models import Contact
from .serializers import ContactSerializer, UserSerializer, UserUsernameSerializer
from shops.models import Shop

User = get_user_model()


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"
    permission_classes = [IsRequestUser, IsAuthenticated]


class FollowingViewSet(
    viewsets.GenericViewSet,
):
    parser_classes = [JSONParser]
    lookup_field = "username"
    permission_classes = [IsAuthenticated]

    def connection_exists(self, user_from, user_to):
        return (
            Contact.objects.filter(user_from=user_from, user_to=user_to).exists()
            and user_from != user_to
        )

    @action(methods=["post"], detail=True, permission_classes=[IsAuthenticated])
    def follow(self, request, username=None):
        user_from = request.user
        try:
            user_to = User.objects.get(username=self.kwargs["username"])
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if self.connection_exists(user_from, user_to):
            return Response(
                {"message": "You're already following this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user_from.following.add(user_to)
        # Create action
        create_action(user_from, "followed", user_to)
        return Response({}, status=status.HTTP_201_CREATED)

    @action(
        methods=["post", "delete"], detail=True, permission_classes=[IsAuthenticated]
    )
    def unfollow(self, request, username=None):
        user_from = request.user
        try:
            user_to = User.objects.get(username=self.kwargs["username"])
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if not self.connection_exists(user_from, user_to):
            return Response(
                {"message": "You're not following this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user_from.following.remove(user_to)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
