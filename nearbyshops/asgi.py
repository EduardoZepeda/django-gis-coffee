import os

from django.conf import settings
from django.core.asgi import get_asgi_application

# before anything make sure the application is loaded, so apps can be imported
# please don't rearrange imports here because the order is important
current_settings = (
    "nearbyshops.settings" if settings.DEBUG else "nearbyshops.dev_settings"
)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", current_settings)
django_asgi_app = get_asgi_application()

import chat.routing
from chat.middleware import TokenAuthMiddleware
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter


application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": TokenAuthMiddleware(URLRouter(chat.routing.websocket_urlpatterns)),
    }
)
