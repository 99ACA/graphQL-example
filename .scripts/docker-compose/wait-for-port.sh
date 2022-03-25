#!/bin/bash

echo " "
echo "waiting for Redis.."
until $(nc -zv ${REDIS_CONTAINER_NAME:-localhost} ${REDIS_PORT:-6379}); do
    printf '.'
    sleep 1
done