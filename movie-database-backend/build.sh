#!/usr/bin/env bash
eval $(minikube docker-env -p movie-database)

NAME='movie-database-backend:latest'

docker build . -t "$NAME"

