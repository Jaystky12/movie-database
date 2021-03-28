FROM node:12 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build


FROM nginx:1.19-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
