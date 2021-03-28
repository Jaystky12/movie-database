#!/usr/bin/env bash
eval $(minikube docker-env -p movie-database)

NAME='movie-database-frontend:latest'

docker build . -t "$NAME"

