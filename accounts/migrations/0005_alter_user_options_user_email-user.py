# Generated by Django 4.0.4 on 2022-10-26 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_contact_userto-userfrom"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={},
        ),
        migrations.AddConstraint(
            model_name="user",
            constraint=models.UniqueConstraint(
                fields=("username", "email"), name="email-user"
            ),
        ),
    ]
