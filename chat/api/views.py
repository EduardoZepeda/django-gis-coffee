from django.db.models import Case, Q, When, Value
from django.db.models.functions import Concat
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
        recent = self.request.query_params.get("recent")
        if recent:
            return (
                # Return only the last message received or sent by the  current user
                Message.objects.filter(
                    Q(receiver=self.request.user) | Q(sender=self.request.user)
                )
                .annotate(
                    # this prevents us from listing a message send or received by the user as different conversations
                    conversation=Case(
                        When(
                            sender=self.request.user,
                            then=Concat(
                                "sender__username", Value("-"), "receiver__username"
                            ),
                        ),
                        When(
                            receiver=self.request.user,
                            then=Concat(
                                "receiver__username", Value("-"), "sender__username"
                            ),
                        ),
                    )
                )
                .distinct("conversation")
                .order_by("conversation", "-timestamp")
            )
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
            OpenApiParameter(
                name="recent",
                description="Retrieve the last messages sent or received by the current user",
                required=False,
                type=bool,
            ),
        ],
    )
    def list(self, request):
        # your non-standard behaviour
        return super().list(request)
