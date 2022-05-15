# Generated by Django 4.0.4 on 2022-05-14 20:44

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0007_alter_shop_rating"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shop",
            name="rating",
            field=models.DecimalField(
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
    ]