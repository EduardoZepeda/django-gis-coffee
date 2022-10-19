## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

## backup/production: Create a backup of the production database
.PHONY: backup/prod
backup/prod:
	@echo 'Creating a poduction database backup'
	python3 manage.py dumpdata --settings=nearbyshops.settings > prod_backup.json

## backup/dev: Create a backup of the development database
.PHONY: backup/dev
backup/dev:
	@echo 'Creating a poduction development backup'
	python3 manage.py dumpdata --settings=nearbyshops.dev_settings > dev_backup.json

## format: Format code according to black's directives
.PHONY: format
format:
	@echo 'Formating Python code'
	black .

## deploy: Deploy to fly.io
.PHONY: deploy
deploy:
	@echo 'Deploying app to fly.io'
	fly deploy