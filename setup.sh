#!/usr/bin/env bash

source <(minikube -p movie-database docker-env)
eval $(minikube docker-env -p movie-database)

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"


helm repo add appscode https://charts.appscode.com/stable/
helm repo update

kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager.yaml
helm install kubed appscode/kubed --version v0.12.0 --namespace kube-system

sleep 60

#apply ssl
cd "$DIR/certs"
./add-certs.sh
sleep 10


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
