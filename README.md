# Movie Database

Simple website that allows browsing / searching movie database provided by
http://www.omdbapi.com/. Only logged in users are capable to use this feature (standard
login or Facebook/Google).

## Installation
### Dependencies
The following software should be installed before installing the platform.

#### VirtualBox

[VirtualBox](https://www.virtualbox.org/wiki/Downloads)

To install on Ubuntu
```
sudo apt install virtualbox virtualbox-ext-pack
```

#### Nodejs and npm

To install on Ubuntu
```
sudo apt install nodejs
```

#### Docker
[Docker](https://docs.docker.com/get-docker/)
To install on Ubuntu
```
sudo apt install docker.io
```

#### Helm
[Helm](https://helm.sh/)
To install on Ubuntu
```
sudo snap install helm --classic
```


#### Kubectl
[Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
To install on Ubuntu
```
snap install kubectl --classic
```

#### Minikube
[Minikube](https://minikube.sigs.k8s.io/docs/start/)
To install on Ubuntu
```
cd ~/Downloads
sudo apt-get install apt-transport-https
wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube-linux-amd64
sudo mv minikube-linux-amd64 /usr/local/bin/minikube
```

#### CertUtil
**This should only be required for Linux**

To install on Ubuntu
```
sudo apt install libnss3-tools
```

## Installation and running
* Run `start.sh` it will create a virtual machine for our cluster
* Run `setup.sh` to set up kubernetes configs
* To stop the system run `stop.sh`

## Add the cluster ip to hosts file
execute: 
```shell script
minikube -p movie-database ip
```
add the result `{ip} movie-database.pl` to the /etc/hosts file 

## Interface
* Access the frontend application with url: `http://movie-database.pl.pl/`
