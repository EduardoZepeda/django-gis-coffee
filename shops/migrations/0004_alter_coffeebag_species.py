# Generated by Django 4.0.4 on 2022-05-12 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0003_coffeebag_shop_roaster"),
    ]

    operations = [
        migrations.AlterField(
            model_name="coffeebag",
            name="species",
            field=models.CharField(
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
    ]
