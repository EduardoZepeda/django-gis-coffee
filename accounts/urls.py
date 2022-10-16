from django.urls import path, include
from django.contrib.auth.views import PasswordChangeView
from .views import (
    RegisterUser,
    UpdateUser,
    ChangePassword,
    PasswordChanged,
    UserProfile,
    FollowUser,
    UserLikes,
)

urlpatterns = [
    path("", include("django.contrib.auth.urls")),
    path(
        "change-password/",
        PasswordChangeView.as_view(
            template_name="accounts/change-password.html", success_url="/"
        ),
        name="change_password",
    ),
    path("<int:pk>/likes/", UserLikes.as_view(), name="likes"),
    path("<int:pk>/profile/", UserProfile.as_view(), name="user_profile"),
    path("<int:pk>/update/", UpdateUser.as_view(), name="update"),
    path("follow/", FollowUser.as_view(), name="follow"),
    path("register/", RegisterUser.as_view(), name="register"),
    path("change-password/", ChangePassword.as_view(), name="change_password"),
    path("password-changed/", PasswordChanged.as_view(), name="password_changed"),
]
