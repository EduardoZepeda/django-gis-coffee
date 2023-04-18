from django.contrib import admin

from .models import Message


class MessageAdmin(admin.ModelAdmin):
    list_display = (
        "sender",
        "receiver",
        "message",
    )
    search_fields = ("sender", "receiver", "message")


admin.site.register(Message, MessageAdmin)
