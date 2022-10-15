# Generated by Django 4.0.4 on 2022-10-15 19:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("reviews", "0002_review_only one review per user and shop"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="shop",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to="shops.shop",
            ),
        ),
        migrations.AlterField(
            model_name="review",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
