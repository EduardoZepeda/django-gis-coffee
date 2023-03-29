from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.api.serializers import UserPrivateSerializer

from ..models import Action

class ActionTargetSerializer(serializers.RelatedField):
    #TODO change representation to a proper link of the object
    def to_representation(self, value):
        return str(value)

class ActionSerializer(serializers.ModelSerializer):
    target = ActionTargetSerializer(many=False, read_only=True)
    user = UserPrivateSerializer(many=False, read_only=True)

    class Meta:
        model = Action
        fields = ['user', 'action', 'target', 'created']

class ActionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retrieve only current user's feed
        return Action.objects.filter(user=self.request.user)
