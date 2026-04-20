
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_ENV_FILE=.env
COPY package*.json ./
RUN npm ci
COPY . .

COPY $VITE_ENV_FILE ./.env

RUN npm run build

FROM nginx:1-alpine-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
