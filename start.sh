PROJECT="movie-database"

minikube -p "$PROJECT" start --driver=virtualbox --cpus=2 --memory=2g --mount=true --extra-config=apiserver.service-node-port-range=80-30000

minikube -p "$PROJECT" addons enable ingress
minikube -p "$PROJECT" ssh "sudo ifconfig eth0:0 192.168.99.10"
