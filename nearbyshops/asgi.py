import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.conf import settings

import chat.routing

current_settings = "nearbyshops.settings" if settings.DEBUG else "nearbyshops.dev_settings"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", current_settings)

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})