ARG PYTHON_VERSION=3.9

FROM python:${PYTHON_VERSION}

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    python3-dev \
    python3-setuptools \
    python3-wheel \
    gdal-bin \ 
    libgdal-dev \
    python3-gdal \
    postgis \
    binutils \
    postgresql-postgis \
    libproj-dev

RUN mkdir app
WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN python3 manage.py collectstatic --noinput

EXPOSE 8080

CMD ["gunicorn", "nearbyshops.asgi", "--workers", "1", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", ":8080"]

