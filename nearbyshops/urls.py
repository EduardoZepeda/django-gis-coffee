from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers

from accounts.api.views import (
    FollowingViewSet,
    UserViewSet,
)
from feeds.api.views import ActionViewSet
from reviews.api.views import ReviewViewSet
from shops import views
from shops.api.views import CoffeeBagViewSet, ShopViewSet, ShopLikesViewSet
from shops.sitemap import ShopSitemap

schema_view = get_schema_view(
    openapi.Info(
        title="Django Gis Coffee",
        default_version="v1",
        description="Nearest Coffee Shop GIS application, and social network",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="eduardozepeda@coffeebytes.dev"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

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
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
    path("api/v1/", include(router.urls)),
    path("api/v1/authentication/", include("dj_rest_auth.urls")),
    path("api/v1/registration/", include("dj_rest_auth.registration.urls")),
]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
