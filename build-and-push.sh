#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-gateway:latest -f ./apps/gateway/Dockerfile --target production .
docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-notification:latest -f ./apps/notification/Dockerfile --target production .
docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-order:latest -f ./apps/order/Dockerfile --target production .
docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-payment:latest -f ./apps/payment/Dockerfile --target production .
docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-product:latest -f ./apps/product/Dockerfile --target production .
docker buildx build --platform linux/amd64,linux/arm64 -t codefactoryofficial/fc-nestjs-user:latest -f ./apps/user/Dockerfile --target production .

docker push codefactoryofficial/fc-nestjs-gateway:latest
docker push codefactoryofficial/fc-nestjs-notification:latest
docker push codefactoryofficial/fc-nestjs-order:latest
docker push codefactoryofficial/fc-nestjs-payment:latest
docker push codefactoryofficial/fc-nestjs-product:latest
docker push codefactoryofficial/fc-nestjs-user:latest