from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from utils.permissions.api_permissions import IsOwnerOrReadOnly, IsStaffOrReadOnly
from feeds.utils import create_action

from ..models import Review
from .serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """Filter reviews by shop id otherwise return full list of reviews"""
        shop_id = self.request.query_params.get("shop_id")
        if shop_id:
            return Review.objects.filter(shop__id=shop_id)
        return Review.objects.all()

    def perform_create(self, serializer):
        review = serializer.save(user=self.request.user)
        create_action(self.request.user, "reviewed", review.shop)
