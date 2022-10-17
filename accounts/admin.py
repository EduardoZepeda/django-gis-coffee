from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

# Register your models here.
from .models import Contact, User

user = get_user_model()

class CustomUserAdmin(UserAdmin):
    pass

admin.site.register(Contact)
admin.site.register(user, CustomUserAdmin)





