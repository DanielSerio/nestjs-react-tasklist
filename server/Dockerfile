FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Source code will be mounted via volume, so no COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]