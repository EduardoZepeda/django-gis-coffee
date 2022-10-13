# Generated by Django 4.0.4 on 2022-10-11 17:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shops', '0011_alter_shop_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='likes',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]