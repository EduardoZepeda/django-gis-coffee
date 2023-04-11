from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.api.serializers import (
    UserIdSerializer,
    UserUsernameSerializer,
    FeedUserSerializer,
)
from shops.api.serializers import FeedShopSerializer
from shops.models import Shop

from ..models import Action

User = get_user_model()


class ActionTargetSerializer(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Shop):
            serializer = FeedShopSerializer(
                value, context={"request": self.context.get("request")}
            )
        if isinstance(value, User):
            serializer = FeedUserSerializer(
                value, context={"request": self.context.get("request")}
            )
        return serializer.data


class ActionSerializer(serializers.ModelSerializer):
    target = ActionTargetSerializer(many=False, read_only=True)
    user = UserUsernameSerializer(many=False, read_only=True)

    class Meta:
        model = Action
        fields = ["user", "action", "target", "created"]
