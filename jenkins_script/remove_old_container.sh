#!/bin/sh

contid=$(docker ps --all | grep gift4u | awk '{print $1}')
if [ ! -z $contid ]; then
      docker stop $contid
      docker rm $contid
      docker image prune -f
fi
