from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django_resized import ResizedImageField

from .utils import user_directory_path


class Contact(models.Model):
    """A model for tracking user followers and following relationships"""

    user_from = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="rel_from_set", on_delete=models.CASCADE
    )
    user_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="rel_to_set", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created",)
        constraints = [
            # Ensure follow records are unique
            models.UniqueConstraint(
                fields=["user_to", "user_from"], name="userTo-userFrom"
            )
        ]

    def __str__(self):
        return "{} follows {}".format(self.user_from, self.user_to)


class User(AbstractUser):
    following = models.ManyToManyField(
        "self", through=Contact, related_name="followers", symmetrical=False
    )
    profile_picture = ResizedImageField(
        size=[500, 500], upload_to=user_directory_path, null=True, blank=True
    )
    bio = models.CharField(max_length=250, blank=True, null=True)

    def get_absolute_url(self):
        return reverse("accounts:user_profile", args=[self.pk])

    class Meta:
        constraints = [
            # Prevent a user from registering an existing email address
            models.UniqueConstraint(fields=["email"], name="unique-email"),
            # Ensure username and email combination are unique
            models.UniqueConstraint(fields=["username", "email"], name="email-user"),
        ]
