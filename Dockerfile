# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL
ENV NODE_OPTIONS --openssl-legacy-provider
RUN npm run build

# development stage
FROM node:lts-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

# production stage
FROM nginx:stable-alpine as production
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf