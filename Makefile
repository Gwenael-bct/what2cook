# Variables
PROJECT = what2cook
COMPOSE = docker compose
OVERRIDE = -f docker-compose.override.yml

# Mode dev (avec hot reload React)
dev:
	$(COMPOSE) up --build

# Mode prod (sans override, build statique avec nginx)
prod:
	$(COMPOSE) -f docker-compose.yml up --build

# Arrêter et nettoyer les conteneurs
down:
	$(COMPOSE) down

# Nettoyer tout (conteneurs, volumes, images)
clean:
	$(COMPOSE) down -v --rmi all --remove-orphans
