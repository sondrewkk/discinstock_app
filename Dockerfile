# build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.4.0
RUN npm install
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL
ENV NODE_OPTIONS --openssl-legacy-provider
RUN npm run build

# development stage
FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

# production stage
FROM nginx:1.24-alpine3.17 as production
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf