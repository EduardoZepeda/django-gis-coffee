from rest_framework import serializers

from accounts.api.serializers import UserUsernameSerializer

from ..models import Action


class ActionTargetSerializer(serializers.RelatedField):
    # TODO change representation to a proper link of the object
    def to_representation(self, value):
        return str(value)


class ActionSerializer(serializers.ModelSerializer):
    target = ActionTargetSerializer(many=False, read_only=True)
    user = UserUsernameSerializer(many=False, read_only=True)

    class Meta:
        model = Action
        fields = ["user", "action", "target", "created"]
