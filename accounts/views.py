from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordChangeForm, UserCreationForm
from django.contrib.auth.views import PasswordChangeView
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import DetailView, RedirectView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from .forms import CustomUserCreationForm

# Allow us to use a custom user model
User = get_user_model()

class RegisterUser(CreateView):
    # New custom UseCreationForm is required for setting custom user model
    # Otherwise passwords won't be hashed
    form_class = CustomUserCreationForm
    template_name = "accounts/register.html"

@method_decorator(login_required, name='dispatch')
class UpdateUser(UpdateView):
    model = User
    template_name = "accounts/update.html"
    fields = ['username', 'first_name', 'last_name']

    def get_object(self):
        # Users can only update their own accounts 
        return self.request.user

@method_decorator(login_required, name='dispatch')
class DeleteUser(DeleteView):
    model = User
    template_name = "accounts/delete.html"
    success_url = reverse_lazy('accounts:successful_deleted_account')

    def get_object(self):
        # Users can only delete their own accounts 
        return self.request.user

@method_decorator(login_required, name='dispatch')
class Profile(DetailView):
    template_name = "accounts/profile.html"

    def get_object(self):
        # Users can only see their own profiles 
        return self.request.user

@method_decorator(login_required, name='dispatch')
class UserProfile(DetailView):
    model = User
    template_name = "accounts/user_profile.html"
    context_object_name = "user"

@method_decorator(login_required, name='dispatch')
class ChangePassword(PasswordChangeView):
    form_class = PasswordChangeForm
    success_url = reverse_lazy('accounts:password_changed')
    template_name = 'accounts/change-password.html'

@method_decorator(login_required, name='dispatch')
class PasswordChanged(RedirectView):
    pattern_name = 'accounts:profile'

