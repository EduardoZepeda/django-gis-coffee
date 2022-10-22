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
    binutils \
    libproj-dev \
    nodejs \
    npm

# Vite requires a node version greater than 16, but Python image downloads v12.x
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - 
RUN apt-get install -y nodejs

RUN mkdir app
WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN python3 manage.py collectstatic --noinput

EXPOSE 8080

CMD ["gunicorn", "--bind", ":8080", "--workers", "2", "nearbyshops.wsgi"]