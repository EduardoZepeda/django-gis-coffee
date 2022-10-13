from django.db import models
from django.contrib.auth import get_user_model
from shops.models import Shop
from django.urls import reverse

User = get_user_model()


class Review(models.Model):
    content = models.CharField(max_length=255)
    recommended = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

    def get_absolute_url():
        return reverse("reviews:detail", args=[self.pk])