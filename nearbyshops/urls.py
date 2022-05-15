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
from django.urls import path
from shops import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("", views.Geo.as_view(), name="home"),
    path("new-cafes/", views.Home.as_view(), name="newest_coffee_shops"),
    path("shops/<int:pk>", views.ShopDetail.as_view(), name="shop_detail"),
    path("about/", TemplateView.as_view(template_name="about.html"), name="about"),
    path("legal/", TemplateView.as_view(template_name="legal.html"), name="legal"),
    path("api/v1/shops/@<latitude>,<longitude>", views.NearbyShops.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
