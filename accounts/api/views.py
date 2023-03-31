from django.contrib.auth import get_user_model
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from permissions.api_permissions import IsRequestUser, IsStaffOrReadOnly

from ..models import Contact
from .serializers import ContactSerializer, UserSerializer, UserUsernameSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"
    permission_classes = [IsRequestUser, IsAuthenticated]


class FollowingViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserUsernameSerializer
    lookup_field = "username"
    parser_classes = [JSONParser]
    permission_classes = [IsRequestUser, IsAuthenticated]

    def is_following(self, user_from_id, user_to_id):
        """Check if one user is following another user"""
        return Contact.objects.filter(
            user_from__id=user_from_id, user_to__id=user_to_id
        ).exists()

    @action(methods=["post", "delete"], detail=True)
    def following(self, request, username=None):
        serializer = ContactSerializer(
            data={"user_to": request.data["user_to"], "user_from": request.user.id}
        )
        if request.method == "POST":
            if serializer.is_valid(raise_exception=True):
                # If user is already following the target, return bad request
                if self.is_following(request.user.id, request.data["user_to"]):
                    return Response(
                        {"message": "You're already following that user"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                serializer.save()
                return Response({}, status=status.HTTP_201_CREATED)

        if request.method == "DELETE":
            if serializer.is_valid(raise_exception=True):
                # If user is not following the target return bad request
                if not self.is_following(request.user.id, request.data["user_to"]):
                    return Response(
                        {"message": "You're not following that user"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                # Search for the contact object that exists and delete it
                following = Contact.objects.get(
                    user_from__id=request.user.id, user_to__id=request.data["user_to"]
                )
                following.delete()
                return Response({}, status=status.HTTP_204_NO_CONTENT)
        # If method is not POST or DELETE return method not allowed
        return Response("", status=status.HTTP_405_METHOD_NOT_ALLOWED)
