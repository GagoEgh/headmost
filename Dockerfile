FROM node:8.9.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build --prod --output-path=/dist

FROM nginx:latest
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
