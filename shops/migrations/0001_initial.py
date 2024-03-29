# Generated by Django 4.0.4 on 2022-10-13 15:57

import ckeditor.fields
from decimal import Decimal
from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Shop",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("location", django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ("address", models.CharField(max_length=100)),
                ("city", models.CharField(max_length=50)),
                ("roaster", models.BooleanField(default=False)),
                (
                    "rating",
                    models.DecimalField(
                        choices=[
                            (Decimal("0"), "0"),
                            (Decimal("0.5"), "0.5"),
                            (Decimal("1"), "1"),
                            (Decimal("1.5"), "1.5"),
                            (Decimal("2"), "2"),
                            (Decimal("2.5"), "2.5"),
                            (Decimal("3.0"), "3"),
                            (Decimal("3.5"), "3.5"),
                            (Decimal("4"), "4"),
                            (Decimal("4.5"), "4.5"),
                            (Decimal("5"), "5"),
                        ],
                        decimal_places=1,
                        default=Decimal("0"),
                        max_digits=2,
                    ),
                ),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("modified_date", models.DateTimeField(auto_now=True)),
                ("content", ckeditor.fields.RichTextField(blank=True, null=True)),
                (
                    "likes",
                    models.ManyToManyField(
                        blank=True, related_name="likes", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CoffeeBag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("brand", models.CharField(max_length=200)),
                (
                    "species",
                    models.CharField(
                        choices=[
                            ("Ar", "Arábiga"),
                            ("Ro", "Robusta"),
                            ("Lb", "Libérica"),
                            ("Ex", "Excelsa"),
                        ],
                        default="Ar",
                        max_length=2,
                    ),
                ),
                (
                    "origin",
                    models.CharField(
                        blank=True,
                        choices=[
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
                        ],
                        max_length=2,
                        null=True,
                    ),
                ),
                (
                    "coffee_shop",
                    models.ManyToManyField(related_name="product", to="shops.shop"),
                ),
            ],
        ),
    ]
