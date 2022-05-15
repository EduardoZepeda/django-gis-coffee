from .base_settings import *

DEBUG = False

django_heroku.settings(locals())
DATABASES["default"]["ENGINE"] = "django.contrib.gis.db.backends.postgis"
