from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Message
from accounts.api.serializers import FeedUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = FeedUserSerializer(many=False, read_only=True)
    receiver = FeedUserSerializer(many=False, read_only=True)

    class Meta:
        model = Message
        fields = ["message", "sender", "receiver", "active", "timestamp"]
