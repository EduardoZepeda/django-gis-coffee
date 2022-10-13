# Generated by Django 4.0.4 on 2022-10-12 00:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("shops", "0012_shop_likes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shop",
            name="likes",
            field=models.ManyToManyField(
                blank=True, related_name="likes", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
