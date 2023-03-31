from django.db import models
from django.conf import settings

# Create your models here.
class Message(models.Model):
    reference = models.ForeignKey('self', related_name="reply", on_delete=models.SET_NULL, blank=True, null=True)
    message = models.TextField()
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="sender", on_delete=models.SET_NULL, blank=True, null=True)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="receiver", on_delete=models.SET_NULL,  blank=True, null=True)
    active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.timestamp}{self.message}"