FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
ADD dist  /usr/src/app/dist
EXPOSE 8080
CMD [ "npm", "start" ]