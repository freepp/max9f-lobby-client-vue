FROM node:18.20-slim AS builder
WORKDIR /compile

COPY package.json .
RUN npm config set registry https://registry.npmmirror.com && npm update && npm install

COPY . .
RUN npm run build:h5

FROM nginx

COPY --from=builder /compile/dist/build/h5 /usr/share/nginx/html/
COPY ./build/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./xxyy.json /usr/share/nginx/html/xxyy.json
