# Generated by Django 4.0.4 on 2022-10-25 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_user_bio"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="contact",
            constraint=models.UniqueConstraint(
                fields=("user_to", "user_from"), name="userTo-userFrom"
            ),
        ),
    ]
