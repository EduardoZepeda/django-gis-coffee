from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from .models import Shop, CoffeeBag


@admin.register(Shop)
class ShopAdmin(GISModelAdmin):
    list_display = ("name", "location")
    search_fields = ("name", "address")
    gis_widget_kwargs = {
        "attrs": {"default_lon": -103.349609, "default_lat": 20.659698}
    }


class CoffeeBagAdmin(admin.ModelAdmin):
    search_fields = ("brand", "origin")
    list_filter = ("origin",)


admin.site.register(CoffeeBag, CoffeeBagAdmin)


admin.site.site_header = "Tamper"
admin.site.index_title = "Tamper Panel admin"
admin.site.site_title = "Tamper"
