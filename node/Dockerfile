# Stage 1: Build
FROM node:lts-alpine AS build
ENV NODE_ENV=development
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent

COPY . .
RUN npx tsc

# Stage 2: Production
FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy only built files and production dependencies
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/package-lock.json ./
RUN npm install --production --silent

EXPOSE 4000
CMD ["npm", "start"]