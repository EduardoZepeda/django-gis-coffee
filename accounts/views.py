import json

from django.utils.translation import gettext_lazy as _
from django.contrib import messages
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
from django.views.generic import DetailView, RedirectView, ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from shops.models import Shop
from feeds.models import Action

from .forms import CustomUserCreationForm
from .decorators import anonymous_required
from feeds.utils import create_action

# Allow us to use a custom user model
User = get_user_model()


@method_decorator(anonymous_required("home"), name="dispatch")
class RegisterUser(CreateView):
    # New custom UseCreationForm is required for setting custom user model
    # Otherwise passwords won"t be hashed
    form_class = CustomUserCreationForm
    template_name = "accounts/register.html"



@method_decorator(login_required, name="dispatch")
class UpdateUser(UpdateView):
    model = User
    template_name = "accounts/update.html"
    fields = ["username", "bio", "first_name", "last_name", "profile_picture"]

    def get_success_url(self):
        return reverse("accounts:user_profile", args=[self.request.user.pk])

    def get_object(self):
        # Users can only update their own accounts
        return self.request.user

    def form_valid(self, form):
        messages.add_message(self.request, messages.SUCCESS, _("Your account was updated"))
        return super().form_valid(form)

@method_decorator(login_required, name="dispatch")
class DeleteUser(DeleteView):
    model = User
    template_name = "accounts/delete.html"
    success_url = reverse_lazy("accounts:successful_deleted_account")

    def get_object(self):
        # Users can only delete their own accounts
        return self.request.user


@method_decorator(login_required, name="dispatch")
class UserProfile(DetailView):
    model = User
    template_name = "accounts/user_profile.html"
    context_object_name = "user"

    def get_queryset(self):
        queryset = super().get_queryset()
        # Get the followers and following count, if distinct is not used, it changes the following value
        return queryset.annotate(
            following_count=Count("following", distinct=True)
        ).annotate(followers_count=Count("followers", distinct=True))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.prefetch_related("following").get(pk=self.kwargs.get("pk"))
        context["object"].following_user = self.request.user in user.following.all()
        context["likes"] = Shop.objects.filter(likes=self.object)[:5]
        context["following"] = user.following.all()
        context["followers"] = user.followers.all()
        return context


@method_decorator(login_required, name="dispatch")
class ChangePassword(PasswordChangeView):
    form_class = PasswordChangeForm
    success_url = reverse_lazy("home")
    template_name = "accounts/change-password.html"

    def form_valid(self, form):
        print("Form validdsadsadsadsadsadsadsadsadsadsadsadadsadadsadsadsada")
        messages.add_message(self.request, messages.SUCCESS, _("Your password was changed successfully"))
        return super().form_valid(form)


@method_decorator(login_required, name="dispatch")
class UserLikes(ListView):
    model = Shop
    template_name = "accounts/likes.html"
    context_object_name = "likes"
    paginate_by = 5

    def get_queryset(self):
        queryset = super().get_queryset()
        # Falta el nombre  del usuario en la plantilla
        return queryset.filter(likes__pk=self.kwargs.get("pk"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["user"] = User.objects.get(pk=self.kwargs.get("pk"))
        return context


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
