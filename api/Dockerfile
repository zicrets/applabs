# API
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install || yarn
COPY . .
EXPOSE 3001
CMD ["npm","start"]
