#!/usr/bin/env bash

source <(minikube -p movie-database docker-env)
eval $(minikube docker-env -p movie-database)

kubectl  apply -f kubernetes-configs/mongodb.yaml
kubectl  apply -f kubernetes-configs/redis.yaml
kubectl  apply -f kubernetes-configs/movie-database-backend.yaml
kubectl  apply -f kubernetes-configs/movie-database-frontend.yaml
kubectl  apply -f kubernetes-configs/endpoint.yaml
