DC = docker compose

EXEC = docker exec -it
DB_CONTAINER = example-db
APP_CONTAINER = main-app

LOGS = docker logs
ENV = --env-file .env
STORAGES_FILE = docker_compose/storages.yaml
APP_FILE = docker_compose/app.yaml



.PHONY: storages
storages: 
	${DC} -f ${STORAGES_FILE} ${ENV} up -d

.PHONY: storages-logs
storages-logs: 
	${LOGS} ${DB_CONTAINER} -f

.PHONY: storages-down
storages-down: 
	${DC} -f ${STORAGES_FILE} down


.PHONY: postgres
postgres: 
	${EXEC} ${DB_CONTAINER} psql -U postgres

.PHONY: bash
bash: 
	${EXEC} ${APP_CONTAINER} bash

.PHONY: makemigrations
makemigrations:
	${EXEC} ${APP_CONTAINER} alembic revision --autogenerate -m "${msg}"

.PHONY: migrate
migrate:
	${EXEC} ${APP_CONTAINER} alembic upgrade head

.PHONY: migrate-down
migrate-down:
	${EXEC} ${APP_CONTAINER} alembic downgrade -1



.PHONY: run-test
run-test: 
	${EXEC} ${APP_CONTAINER} pytest 


.PHONY: app
app: 
	${DC} -f ${APP_FILE} -f ${STORAGES_FILE} ${ENV} up -d

.PHONY: app-build
app-build: 
	${DC} -f ${APP_FILE} -f ${STORAGES_FILE} ${ENV} up --build -d

.PHONY: app-logs
app-logs: 
	${LOGS} ${APP_CONTAINER} -f

.PHONY: app-down
app-down: 
	${DC} -f ${APP_FILE} -f ${STORAGES_FILE} down