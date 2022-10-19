from django.contrib.auth.views import PasswordChangeView
from django.urls import include, path

from .views import (
    ChangePassword,
    FollowUser,
    RegisterUser,
    UpdateUser,
    UserLikes,
    UserProfile,
)

urlpatterns = [
    path("<int:pk>/likes/", UserLikes.as_view(), name="likes"),
    path("<int:pk>/profile/", UserProfile.as_view(), name="user_profile"),
    path("<int:pk>/update/", UpdateUser.as_view(), name="update"),
    path("follow/", FollowUser.as_view(), name="follow"),
    path("register/", RegisterUser.as_view(), name="register"),
    path("change-password/", ChangePassword.as_view(), name="change_password"),
    path("", include("django.contrib.auth.urls")),
]
