from django.db.models import Q
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Message
from .serializers import MessageSerializer


class MessagesViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = MessageSerializer
    lookup_field = "username"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter messages by receiver username otherwise return"""
        username = self.request.query_params.get("username")
        # Return any message that has been sent by the current user or has been received by the current user
        # order them by descendant timestamp, will require reverse array in the frontend
        if username:
            return Message.objects.filter(
                Q(receiver__username=username, sender__id=self.request.user.id)
                | Q(receiver__id=self.request.user.id, sender__username=username)
            ).order_by("-timestamp")
        return Message.objects.none()

    @extend_schema(
        # extra parameters added to the schema
        parameters=[
            OpenApiParameter(
                name="username",
                description="The username by which the messages should be filtered",
                required=False,
                type=str,
            ),
        ],
    )
    def list(self, request):
        # your non-standard behaviour
        return super().list(request)
