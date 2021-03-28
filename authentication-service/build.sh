#!/usr/bin/env bash
eval $(minikube docker-env -p movie-database)

NAME='authentication-service:latest'

docker build . -t "$NAME"

