#!/bin/sh
# $1 - root user name
# $2 - private key file (for root user)
# $3 - server IP
# $4 - new user name
# $5 - public key file (for new user)


ROOT_USER=$1
PRIVATE_KEY=$2
SERVER_IP=$3
NEW_USER_NAME=$4
# public key for new user
PUBLIC_KEY=$5

SUDO_GROUP="wheel"
#SUDO_GROUP="sudo"

scp -i $PRIVATE_KEY $PUBLIC_KEY $ROOT_USER@$SERVER_IP:/tmp/

ssh -i $PRIVATE_KEY $ROOT_USER@$SERVER_IP <<ENDSSH
sudo useradd -m -g $SUDO_GROUP $NEW_USER_NAME
sudo su $NEW_USER_NAME
cd ~
# pwd
mkdir .ssh
cat "/tmp/$(basename $PUBLIC_KEY)" > .ssh/authorized_keys
chmod 600 .ssh/*
chmod 700 .ssh/
ENDSSH