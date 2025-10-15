# Tamper

This project serves as a [demo project](https://django-gis-coffee.vercel.app/) that looks for speciality coffee shops nearby user's location, the scope of this project is limited to Guadalajara, México. Furthermore can follow-unfollow users, like and review shops, and chat in real time (powered by websockets) with any user that follows you.

Don't expect an outstanding performance because I'm using free tier for everything as this is only a demo project.

The simplified stack is DRF for the backend and nextjs for the frontend, websockets are served using django-channels, even though I should have used something more powerful, maybe go, but for demo projects I'm on a budget.

## Coffee shops nearby Guadalajara

Tamper uses postgres gis extension to calculate closest coffee shops using user's coordinates. 

The user location is obtained from the geolocation API available in all major browsers.

## Development settings

### Install the required dependencies

To start developing, first install the basic dependencies

```bash
sudo apt install gdal-bin libgdal-dev python3-gdal
```
Now you'll be able to install

```bash
sudo apt install binutils libproj-dev
```

### Environmental variables

The project requires the following environmental variables to work for the backend

```bash
SECRET_KEY=yoursecretkey
DJANGO_SETTINGS_MODULE=nearbyshops.settings
DB_USER=db_user
DB_PASSWORD=dbuser_password
DB_HOST=host.com
DB_PORT=5432
DATABASE=database_name
```

And the following for the frontend

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=yoursupersecretkeyhere=
NEXT_PUBLIC_BACKEND_API=http://127.0.0.1:8000
```

Remember to switch your localhost variables for absolute urls for production environments

### Running backend

``` bash
python manage.py runserver [--settings=dev_settings.py]
```

### Running frontend

``` bash
cd frontend/
npm run dev
```

## Django's GiS Usage

An external database available is required and is taken for granted. The required postgres' documentation is out of the scope of this readme.

### Install django GIS

If you're going to take this project as a template for your project, remember to add the gis package from django to installed apps.

```python
INSTALLED_APPS = [
    # [...]
    'django.contrib.gis'
]
```

### Add PointField

The models object obtained from *django.contrib.gis.db* contains the basic Django fields and the required PointFiel, a GeoDjango-specific geometric field that stores a GEOS Point object consisting of latitde and longitude.

```python
from django.contrib.gis.db import models


class CoffeeShop(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
```

### Register your GEO model

The model must be registered in the admin if you wish to save a model's location on the admin panel.

```python
from django.contrib.gis.admin import OSMGeoAdmin
from .models import CoffeeShop

@admin.register(CoffeeShop)
class CoffeeShopAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')
```

The field will appear as an interactive map on django's admin.

If you use GeoModelAdmin instead of OSMGeoAdmin the admin will use open street map.


### Creating a point

To create a location point, pass it longitude and latitude as arguments. A third argument is SRID, which represents spatial data using longitude and latitude coordinates on the Earth's surface as defined in the WGS84 standard.

```python
from django.views import generic
from django.contrib.gis.geos import fromstr
from django.contrib.gis.db.models.functions import Distance
from .models import Shop

longitude = 20.659698
latitude = -103.349609

user_location = Point(longitude, latitude, srid=4326)
```

### Get data by location

The function Distance receives the user location's coordinates, that can be used to annotate a queryset and order the data accordingly.

```python
CoffeeShop.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[0:6]
```