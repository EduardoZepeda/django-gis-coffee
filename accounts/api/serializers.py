from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets
from permissions.api_permissions import IsAccountAdminOrReadOnly
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UserPrivateSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'url']
        lookup_field = 'username'
        extra_kwargs = {
            'url': {'lookup_field': 'username'}
        }        

class UserSerializer(serializers.HyperlinkedModelSerializer):
    following = UserPrivateSerializer(many=True, read_only=True)
    followers = UserPrivateSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['url','username', 'is_staff', 'profile_picture', 'bio', 'following', 'followers']
        lookup_field = 'username'
        # Generate dynamic user url using username
        extra_kwargs = {
            'url': {'lookup_field': 'username'}
        }


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

