from django.contrib.gis.db import models

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

class Shop(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    roaster = models.BooleanField(default=False)

    def __str__(self):
        return "{}: {}, {}".format(self.name, self.location[0], self.location[1])

class CoffeeBag(models.Model):
    brand = models.CharField(max_length=200)
    species = models.CharField(choices=COFFEE_SPECIES, default="Ar", max_length=2)
    origin = models.CharField(choices=STATE_CHOICES, blank=True, null=True, max_length=2)
    coffee_shop = models.ManyToManyField(Shop, related_name="product")

