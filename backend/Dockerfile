# Dockerfile para backend Node/Express
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"] 