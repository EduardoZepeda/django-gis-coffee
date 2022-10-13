from django.urls import path, include
from django.contrib.auth.views import PasswordChangeView
from .views import (
    RegisterUser,
    UpdateUser,
    ChangePassword,
    PasswordChanged,
    Profile,
    UserProfile,
    FollowUser,
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
    path("profile/", Profile.as_view(), name="profile"),
    path("follow/", FollowUser.as_view(), name="follow"),
    path("profile/<int:pk>/", UserProfile.as_view(), name="user_profile"),
    path("register/", RegisterUser.as_view(), name="register_user"),
    path("update/<int:pk>/", UpdateUser.as_view(), name="update_user"),
    path("change-password/", ChangePassword.as_view(), name="change_password"),
    path("password-changed/", PasswordChanged.as_view(), name="password_changed"),
]
