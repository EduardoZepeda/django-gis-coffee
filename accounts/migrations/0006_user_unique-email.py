# Generated by Django 4.0.4 on 2022-10-26 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_alter_user_options_user_email-user"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="user",
            constraint=models.UniqueConstraint(fields=("email",), name="unique-email"),
        ),
    ]
