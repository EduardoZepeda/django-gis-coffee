import json

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm, UserCreationForm
from django.contrib.auth.views import PasswordChangeView
from django.db.models import Count
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse, reverse_lazy
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.generic import DetailView, RedirectView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from shops.models import Shop
from feeds.models import Action

from .forms import CustomUserCreationForm
from .decorators import anonymous_required
from feeds.utils import create_action

# Allow us to use a custom user model
User = get_user_model()


@method_decorator(anonymous_required("accounts:profile"), name="dispatch")
class RegisterUser(CreateView):
    # New custom UseCreationForm is required for setting custom user model
    # Otherwise passwords won"t be hashed
    form_class = CustomUserCreationForm
    template_name = "accounts/register.html"


@method_decorator(login_required, name="dispatch")
class UpdateUser(UpdateView):
    model = User
    template_name = "accounts/update.html"
    fields = ["username", "first_name", "last_name"]

    def get_success_url(self):
        return reverse("accounts:profile")

    def get_object(self):
        # Users can only update their own accounts
        return self.request.user


@method_decorator(login_required, name="dispatch")
class DeleteUser(DeleteView):
    model = User
    template_name = "accounts/delete.html"
    success_url = reverse_lazy("accounts:successful_deleted_account")

    def get_object(self):
        # Users can only delete their own accounts
        return self.request.user


@method_decorator(login_required, name="dispatch")
class Profile(DetailView):
    template_name = "accounts/profile.html"

    def get_object(self):
        # Users can only see their own profiles
        return self.request.user

    def get_context_data(self, **kwargs):
        context = super(Profile, self).get_context_data(**kwargs)
        # Add shops that the user has liked to context data
        context["likes"] = Shop.objects.filter(likes=self.object)
        return context


@method_decorator(login_required, name="dispatch")
class UserProfile(DetailView):
    model = User
    template_name = "accounts/user_profile.html"
    context_object_name = "user"

    def get_queryset(self):
        queryset = super(UserProfile, self).get_queryset()
        return queryset.annotate(followers_count=Count("following"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["object"].following_user = (
            self.request.user
            in User.objects.get(pk=self.kwargs.get("pk")).following.all()
        )
        return context

    def dispatch(self, request, *args, **kwargs):
        if request.user == self.get_object():
            return redirect("accounts:profile")
        return super().dispatch(request, *args, **kwargs)


@method_decorator(login_required, name="dispatch")
class ChangePassword(PasswordChangeView):
    form_class = PasswordChangeForm
    success_url = reverse_lazy("accounts:password_changed")
    template_name = "accounts/change-password.html"


@method_decorator(login_required, name="dispatch")
class PasswordChanged(RedirectView):
    pattern_name = "accounts:profile"


@method_decorator(login_required, name="dispatch")
class FollowUser(generic.View):
    def post(self, request):
        data = json.loads(request.body)
        if (
            request.headers.get("x-requested-with") == "XMLHttpRequest"
            and type(data.get("id")) == int
        ):
            # Receive JSON request from template frontend
            user = get_object_or_404(User, pk=data.get("id"))
            if request.user == user:
                return JsonResponse(
                    {"error": "You can't follow your own account."}, status=400
                )
            # data.liked can be either true or false
            if data.get("action") == "unfollow":
                user.following.remove(request.user)
                return JsonResponse({"message": "ok", "action": "follow"})
            user.following.add(request.user)
            create_action(self.request.user, "followed", user)
            return JsonResponse({"message": "ok", "action": "unfollow"})
        return JsonResponse(
            {
                "error": "Data should contain a JSON object with an id and an action keys. "
            },
            status=400,
        )



