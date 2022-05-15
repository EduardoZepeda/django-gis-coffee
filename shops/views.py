from django.shortcuts import render
from django.core.serializers import serialize
from django.contrib.gis import forms
from leaflet.forms.widgets import LeafletWidget
from django.views import generic
from django.views.generic.detail import DetailView
from django.http import HttpResponse
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from .models import Shop

longitude = -103.349609
latitude = 20.659698

user_location = Point(longitude, latitude, srid=4326)


class MyGeoForm(forms.Form):
    point = forms.PointField(widget=LeafletWidget())


class Home(generic.ListView):
    model = Shop
    context_object_name = "shops"
    queryset = Shop.objects.order_by("-created_date")[0:6]
    template_name = "shops/index.html"


class Geo(generic.View):
    def get(self, request):
        form = MyGeoForm()
        return render(request, "shops/geo.html", {"form": form})


class NearbyShops(generic.View):
    def get(self, request, latitude, longitude):
        coordenates = Point(float(longitude), float(latitude), srid=4326)
        nearby_shops = Shop.objects.annotate(
            distance=Distance("location", coordenates)
        ).order_by("distance")[0:6]
        # geojson deals with point fields
        data = serialize(
            "geojson",
            nearby_shops,
            geometry_field="location",
            fields=("name", "pk", "address", "rating"),
        )
        return HttpResponse(data, content_type="application/json")


class ShopDetail(generic.DetailView):
    model = Shop
    template_name = "shops/detail.html"
    context_object_name = "shop"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        shop_coords = context["object"].location.coords
        # Update DEFAULT_ZOOM for Shop detail view
        context["settings_overrides"] = {
            "DEFAULT_ZOOM": 15,
            "DEFAULT_CENTER": (shop_coords[1], shop_coords[0]),
        }
        return context
