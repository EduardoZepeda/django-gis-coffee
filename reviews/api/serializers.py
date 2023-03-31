from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets

from accounts.api.serializers import UserUsernameSerializer

from ..models import Review


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    user = UserUsernameSerializer(many=False, read_only=True)

    class Meta:
        model = Review
        fields = [
            "content",
            "recommended",
            "user",
            "shop",
            "created_date",
            "modified_date",
            "url",
        ]

    def validate_shop(self, shop):
        """
        Check that user hasn't reviewed the shop
        """
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        review = Review.objects.filter(user=user, shop=shop).exists()
        if review:
            raise serializers.ValidationError(
                "You have already left a review for this coffee shop"
            )
        return shop
