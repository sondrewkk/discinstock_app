# build stage
FROM node:lts-alpine as build-stage

# NODE_ENV should always be set to production when using build command
ENV NODE_ENV=production 

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# development stage
FROM node:lts-alpine as development
RUN npm install -g http-server
COPY --from=build-stage /app/dist /app/dist
WORKDIR /app
EXPOSE 8080
CMD ["http-server", "dist"]

# production stage
FROM nginx:stable-alpine as production
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]