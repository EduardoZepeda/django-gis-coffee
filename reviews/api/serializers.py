from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets
from permissions.api_permissions import IsAccountAdminOrReadOnly, IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from ..models import Review
from accounts.api.serializers import UserSerializer

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Review
        fields = ['content', 'recommended', 'user', 'shop', 'created_date', 'modified_date', 'url']

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
