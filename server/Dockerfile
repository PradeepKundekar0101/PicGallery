# Stage 1: Build stage
FROM node:latest AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --only=prod

EXPOSE 8080

CMD ["npm", "start"]