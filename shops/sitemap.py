from django.contrib.sitemaps import Sitemap
from shops.models import Shop


class ShopSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8

    def items(self):
        return Shop.objects.all()

    def lastmod(self, obj):
        return obj.modified_date
