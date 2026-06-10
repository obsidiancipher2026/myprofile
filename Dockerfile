FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN mkdir -p src/public/uploads

EXPOSE 3000

CMD ["node", "src/server.js"]
