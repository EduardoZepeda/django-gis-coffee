import json
from django.contrib.auth.decorators import login_required
from django.contrib.gis import forms
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.postgres.search import SearchVector
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.generic.detail import DetailView
from leaflet.forms.widgets import LeafletWidget

from .forms import SearchForm
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
    def get(self, request, latitude, longitude, radius):
        # set radius limit between 0 and 50
        radius = int(radius)
        distance_in_km = radius if radius < 50 and radius >= 0 else 5
        # Many options if distance is shorter otherwise less options
        available_options = 15 if distance_in_km < 10 else 6
        coordenates = Point(float(longitude), float(latitude), srid=4326)
        nearby_shops = Shop.objects.annotate(
            distance=Distance("location", coordenates)
        ).filter(distance__lte=D(km=radius)).order_by("distance")[0:available_options]
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
        # Retrieve whether the current users likes or not the current coffee shop
        context["object"].liked = self.request.user in Shop.objects.get(pk=self.kwargs.get('pk')).likes.all()
        return context


class SearchShops(generic.View):
    def get(self, request, query):
        f = SearchForm({"query": query})
        if f.is_valid():
            shops = Shop.objects.annotate(
                search=SearchVector("name", "content", config="spanish")
            ).filter(search=query)
            return render(
                request, "shops/search.html", {"shops": shops, "query": query}
            )
        shops = {}
        return render(request, "shops/search.html", {"shops": shops, "query": query})

class LikeCoffeeShop(generic.View):
    def post(self, request):
        data = json.loads(request.body)
        if data.get("liked"):
            Shop.objects.get(pk=data.get("id")).likes.remove(request.user)
        else:
            Shop.objects.get(pk=data.get("id")).likes.add(request.user)
        return JsonResponse({"message": "ok"})

