from decimal import Decimal

from ckeditor.fields import RichTextField
from django.contrib.gis.db import models
from django.urls import reverse
from django.utils.text import slugify

STATE_CHOICES = (
    ("26", "Sonora"),
    ("10", "Durango"),
    ("03", "Baja California Sur"),
    ("04", "Campeche"),
    ("16", "Michoacán de Ocampo"),
    ("31", "Yucatán"),
    ("19", "Nuevo León"),
    ("12", "Guerrero"),
    ("11", "Guanajuato"),
    ("25", "Sinaloa"),
    ("15", "Ciudad de México"),
    ("29", "Tlaxcala"),
    ("13", "Hidalgo"),
    ("08", "Chihuahua"),
    ("24", "San Luis Potosí"),
    ("27", "Tabasco"),
    ("23", "Quintana Roo"),
    ("28", "Tamaulipas"),
    ("14", "Jalisco"),
    ("05", "Coahuila de Zaragoza"),
    ("09", "Ciudad de México"),
    ("21", "Puebla"),
    ("06", "Colima"),
    ("02", "Baja California"),
    ("32", "Zacatecas"),
    ("01", "Aguascalientes"),
    ("22", "Querétaro"),
    ("30", "Veracruz de Ignacio de la Llave"),
    ("20", "Oaxaca"),
    ("17", "Morelos"),
    ("18", "Nayarit"),
    ("07", "Chiapas"),
)

COFFEE_SPECIES = (
    ("Ar", "Arábiga"),
    ("Ro", "Robusta"),
    ("Lb", "Libérica"),
    ("Ex", "Excelsa"),
)

UNRATED = Decimal("0")
HALF_A_STAR = Decimal("0.5")
ONE_STAR = Decimal("1")
ONE_AND_HALF_A_STARS = Decimal("1.5")
TWO_STARS = Decimal("2")
TWO_AND_HALF_STARS = Decimal("2.5")
THREE_STARS = Decimal("3.0")
THREE_AND_HALF_STARS = Decimal("3.5")
FOUR_STARS = Decimal("4")
FOUR_AND_HALF_STARS = Decimal("4.5")
FIVE_STARS = Decimal("5")

RATING_CHOICES = (
    (UNRATED, "0"),
    (HALF_A_STAR, "0.5"),
    (ONE_STAR, "1"),
    (ONE_AND_HALF_A_STARS, "1.5"),
    (TWO_STARS, "2"),
    (TWO_AND_HALF_STARS, "2.5"),
    (THREE_STARS, "3"),
    (THREE_AND_HALF_STARS, "3.5"),
    (FOUR_STARS, "4"),
    (FOUR_AND_HALF_STARS, "4.5"),
    (FIVE_STARS, "5"),
)


class Shop(models.Model):
    name = models.CharField(max_length=100)
    # slug = models.SlugField(max_length=255, unique=True)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    roaster = models.BooleanField(default=False)
    rating = models.DecimalField(
        default=UNRATED, max_digits=2, decimal_places=1, choices=RATING_CHOICES
    )
    likes = models.ManyToManyField("accounts.User", related_name="likes", blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    content = RichTextField(blank=True, null=True)

    def get_absolute_url(self):
        return reverse("shops:detail", args=[self.pk])

    def __str__(self):
        return "{}".format(self.name)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Shop, self).save(*args, **kwargs)

class CoffeeBag(models.Model):
    brand = models.CharField(max_length=200)
    species = models.CharField(choices=COFFEE_SPECIES, default="Ar", max_length=2)
    origin = models.CharField(
        choices=STATE_CHOICES, blank=True, null=True, max_length=2
    )
    coffee_shop = models.ManyToManyField(Shop, related_name="product")

    def __str__(self):
        return "{} {}".format(self.brand, self.get_origin_display())
