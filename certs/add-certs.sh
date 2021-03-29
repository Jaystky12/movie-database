#!/usr/bin/env bash
VERSION=1.4.1
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  FILE=mkcert-v$VERSION-linux-amd64
elif [[ "$OSTYPE" == "darwin"* ]]; then
  FILE=mkcert-v$VERSION-darwin-amd64
else
  echo "unsupported os"
  exit
fi

if test ! -f "$FILE"; then
  wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/$FILE
  chmod +x $FILE
fi

./$FILE -install
cat "$(./$FILE -CAROOT)/rootCA.pem" >tls.crt
cat "$(./$FILE -CAROOT)/rootCA-key.pem" >tls.key
kubectl create secret tls mkcert-ca -n cert-manager --cert=tls.crt --key=tls.key
kubectl apply -f ./mkcert-ca.yaml