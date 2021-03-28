#!/usr/bin/env bash

source <(minikube -p movie-database docker-env)
eval $(minikube docker-env -p movie-database)

cd authentication-service
./build.sh
cd ../movie-database-backend
./build.sh
cd ../movie-database-frontend
./build.sh
cd ..

kubectl  apply -f kubernetes-configs/mongodb.yaml
kubectl  apply -f kubernetes-configs/redis.yaml
kubectl  apply -f kubernetes-configs/movie-database-backend.yaml
kubectl  apply -f kubernetes-configs/movie-database-frontend.yaml
kubectl  apply -f kubernetes-configs/authentication-service.yaml
kubectl  apply -f kubernetes-configs/endpoint.yaml
