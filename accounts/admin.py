from django.contrib import admin

# Register your models here.
from .models import Contact, User

admin.site.register(Contact)
admin.site.register(User)
