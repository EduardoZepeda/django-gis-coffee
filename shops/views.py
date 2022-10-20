import json

from django.contrib.auth.decorators import login_required
from django.contrib.gis import forms
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.postgres.search import SearchVector
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from django.db.models import Count
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.utils.decorators import method_decorator
from django.views import generic
from django.views.generic.detail import DetailView
from feeds.utils import create_action
from leaflet.forms.widgets import LeafletWidget

from .forms import SearchForm
from .models import Shop

# These longitude and latitude correspond to Guadalajara's downtown
longitude = -103.349609
latitude = 20.659698

user_location = Point(
    longitude, latitude, srid=4326
)  # srid is a standard, please don't change it


class MyGeoForm(forms.Form):
    point = forms.PointField(widget=LeafletWidget())


class Home(generic.ListView):
    model = Shop
    context_object_name = "shops"
    queryset = Shop.objects.order_by("-created_date")
    template_name = "shops/index.html"
    paginate_by = 5


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
        nearby = (
            Shop.objects.annotate(distance=Distance("location", coordenates))
            .filter(distance__lte=D(km=radius))
            .order_by("distance")[0:available_options]
        )
        # geojson deals with point fields
        data = serialize(
            "geojson",
            nearby,
            geometry_field="location",
            fields=("name", "pk", "address", "rating"),
        )
        return HttpResponse(data, content_type="application/json")


class ShopDetail(generic.DetailView):
    model = Shop
    template_name = "shops/detail.html"
    context_object_name = "shop"

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.annotate(likes_count=Count("likes"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        shop_coords = context["object"].location.coords
        # Update DEFAULT_ZOOM for Shop detail view
        context["settings_overrides"] = {
            "DEFAULT_ZOOM": 15,
            "DEFAULT_CENTER": (shop_coords[1], shop_coords[0]),
        }
        if self.request.user.is_authenticated:
            # Retrieve whether the current users likes or not the current coffee shop
            shop = (
                Shop.objects.prefetch_related("likes")
                .prefetch_related("reviews")
                .get(pk=self.kwargs.get("pk"))
            )
            context["object"].liked = self.request.user in shop.likes.all()
            try:
                review = shop.reviews.get(user=self.request.user)
                context["object"].review = review
            except ObjectDoesNotExist:
                context["object"].review = None
        return context


class SearchShops(generic.ListView):
    model = Shop
    template_name = "shops/search.html"
    paginate_by = 5
    context_object_name = "shops"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["query"] = self.kwargs["query"]
        return context

    def get_queryset(self):
        query = self.kwargs["query"]
        f = SearchForm({"query": query})
        if f.is_valid():
            shops = Shop.objects.annotate(
                search=SearchVector("name", "content", config="spanish")
            ).filter(search=query)
            return shops
        return Shop.objects.none()


@method_decorator(login_required, name="dispatch")
class LikeCoffeeShop(generic.View):
    def post(self, request):
        data = json.loads(request.body)
        if (
            request.headers.get("x-requested-with") == "XMLHttpRequest"
            and type(data.get("id")) == int
        ):
            # Receive JSON request from template frontend
            shop = get_object_or_404(Shop, pk=data.get("id"))
            # data.liked can be either true or false
            if data.get("liked"):
                shop.likes.remove(request.user)
                return JsonResponse({"message": "ok", "liked": False})
            shop.likes.add(request.user)
            create_action(self.request.user, "liked", shop)
            return JsonResponse({"message": "ok", "liked": True})
        return JsonResponse(
            {"error": "Data should contain a JSON object with an id and a liked keys"},
            status=400,
        )


@method_decorator(login_required, name="dispatch")
class LikesByUser(generic.ListView):
    model = Shop
    context_object_name = "shops"
    template_name = "shops/likes.html"
    paginate_by = 10

    def get_queryset(self):
        queryset = super().get_queryset()
        return (
            queryset.prefetch_related("likes")
            .filter(likes=self.request.user)
            .order_by("-created_date")
        )
