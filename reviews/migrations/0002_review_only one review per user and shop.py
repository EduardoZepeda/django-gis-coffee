# Generated by Django 4.0.4 on 2022-10-15 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("reviews", "0001_initial"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="review",
            constraint=models.UniqueConstraint(
                fields=("user", "shop"), name="Only one review per user and shop"
            ),
        ),
    ]
