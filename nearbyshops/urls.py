"""nearbyshops URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from shops import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap
from shops.sitemap import ShopSitemap
from rest_framework import routers
from accounts.api.serializers import UserViewSet
from feeds.api.serializers import ActionViewSet
from shops.api.serializers import ShopViewSet
from shops.api.serializers import CoffeeBagViewSet
from reviews.api.serializers import ReviewViewSet

sitemaps = {
    "shops": ShopSitemap,
}

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'feed', ActionViewSet, basename='action')
router.register(r'shops', ShopViewSet, basename='shop')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'coffee-bags', CoffeeBagViewSet, basename='coffeebag')

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
    path("api/v1/", include(router.urls)),
    path('api/v1/authentication/', include('dj_rest_auth.urls')),
    path('api/v1/registration/', 
          include('dj_rest_auth.registration.urls')),
]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
