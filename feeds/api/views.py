from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from ..models import Action
from .serializers import ActionSerializer


class ActionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retrieve only current user's feed
        return Action.objects.filter(
            Q(user=self.request.user) | Q(user__in=self.request.user.following.all())
        )
