from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Contact

User = get_user_model()


class UserUsernameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["username", "url", "id"]
        # Check user by username instead of pk
        lookup_field = "username"
        extra_kwargs = {"url": {"lookup_field": "username"}}


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # TODO paginate follow*
    following = UserUsernameSerializer(many=True, read_only=True)
    followers = UserUsernameSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["url", "username", "profile_picture", "bio", "following", "followers"]
        lookup_field = "username"
        # Generate dynamic user url using username
        extra_kwargs = {"url": {"lookup_field": "username"}}


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["user_to", "user_from"]


class UserIdSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate_id(self, value):
        if User.objects.filter(id=value).exists():
            return value
        raise serializers.ValidationError("User doesn't exist")
