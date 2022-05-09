from django.shortcuts import render
from django.contrib.gis import forms
from django.views import generic
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from .models import Shop

longitude = -103.349609
latitude = 20.659698

user_location = Point(longitude, latitude, srid=4326)


class MyGeoForm(forms.Form):
    point = forms.PointField(
        widget=forms.OSMWidget(attrs={
            "map_width": 800, 
            "map_height": 500, 
            'default_lat': 20.659698,
            'default_lon': -103.349609,
            "default_zoom": 12,
        })
    )

class Home(generic.ListView):
    model = Shop
    context_object_name = "shops"
    queryset = Shop.objects.annotate(
        distance=Distance("location", user_location)
    ).order_by("distance")[0:6]
    template_name = "shops/index.html"


class Geo(generic.View):
    form_class = MyGeoForm
    template_name = "shops/geo.html"
    success_url = "/geo/"

    def get(self, request):
        form = MyGeoForm()
        return render(request, "shops/geo.html", {"form": form})


    def post(self, request):
        form = MyGeoForm(request.POST)
        if form.is_valid():
            nearby_shops = Shop.objects.annotate(
                distance=Distance("location", form.cleaned_data["point"])
            ).order_by("distance")[0:6]
            form = MyGeoForm()
            return render(request, "shops/geo.html", {"form": form, "shops": nearby_shops})
        return render(request, "shops/geo.html", {"form": form })

