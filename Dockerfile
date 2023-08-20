FROM node:current-alpine3.18

WORKDIR /app
COPY . .
RUN npm install --production | npx prisma generate --schema=./src/schema/schema.prisma

CMD [ "npm", "run", "start" ]