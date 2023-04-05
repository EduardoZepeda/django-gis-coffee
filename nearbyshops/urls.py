from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from dj_rest_auth.views import PasswordResetConfirmView
from rest_framework import permissions, routers

from accounts.api.views import FollowingViewSet, UserViewSet
from feeds.api.views import ActionViewSet
from reviews.api.views import ReviewViewSet
from shops import views
from shops.api.views import CoffeeBagViewSet, ShopLikesViewSet, ShopViewSet
from shops.sitemap import ShopSitemap

sitemaps = {
    "shops": ShopSitemap,
}

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"users", FollowingViewSet, basename="user")
router.register(r"shops", ShopViewSet, basename="shop")
router.register(r"shops", ShopLikesViewSet, basename="shop")
router.register(r"feed", ActionViewSet, basename="action")
router.register(r"reviews", ReviewViewSet, basename="review")
router.register(r"coffee-bags", CoffeeBagViewSet, basename="coffeebag")

urlpatterns = [
    # Solve bug in rest-auth library
    # see: https://github.com/Tivix/django-rest-auth/issues/651
    # Note: The bug still exists in https://github.com/iMerica/dj-rest-auth
    # DRF-Spectacular automatic documentation
    path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/v1/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/v1/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    # Robots and sitemap
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
    ),
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
    path("", views.Geo.as_view(), name="home"),
    path("admin/", admin.site.urls, name="admin"),
    path("accounts/", include(("accounts.urls", "accounts"), namespace="accounts")),
    path("reviews/", include(("reviews.urls", "reviews"), namespace="reviews")),
    path("feed/", include(("feeds.urls", "feeds"), namespace="feeds")),
    path("shops/", include(("shops.urls", "shops"), namespace="shops")),
    path("about/", TemplateView.as_view(template_name="about.html"), name="about"),
    path("legal/", TemplateView.as_view(template_name="legal.html"), name="legal"),
    path(
        "api/v1/rest-auth/password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("api/v1/", include(router.urls)),
    path("api/v1/authentication/", include("dj_rest_auth.urls")),
    path("api/v1/registration/", include("dj_rest_auth.registration.urls")),
]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
