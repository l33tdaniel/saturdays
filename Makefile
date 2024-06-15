# Makefile

# Variables
IMAGE_NAME = mongo:latest
CONTAINER_NAME = mongodb
MONGO_INITDB_ROOT_USERNAME = user
MONGO_INITDB_ROOT_PASSWORD = password
VOLUME_NAME = mongodb_data
PORT = 27017

# Default target
.PHONY: all
all: build up

# Build Docker image (optional, if you use a custom Dockerfile)
.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

# Create Docker volume
.PHONY: volume
volume:
	docker volume create $(VOLUME_NAME)

# Start MongoDB container
.PHONY: up
up: volume
	docker run -d \
		--name $(CONTAINER_NAME) \
		-e MONGO_INITDB_ROOT_USERNAME=$(MONGO_INITDB_ROOT_USERNAME) \
		-e MONGO_INITDB_ROOT_PASSWORD=$(MONGO_INITDB_ROOT_PASSWORD) \
		-v $(VOLUME_NAME):/data/db \
		-p $(PORT):27017 \
		$(IMAGE_NAME)

# Start MongoDB container if stopped
.PHONY: start
start:
	docker start $(CONTAINER_NAME)

# Stop MongoDB container
.PHONY: stop
stop:
	docker stop $(CONTAINER_NAME)

# Remove MongoDB container
.PHONY: clean
clean: stop
	docker rm $(CONTAINER_NAME)

# Remove Docker volume
.PHONY: remove-volume
remove-volume:
	docker volume rm $(VOLUME_NAME)
