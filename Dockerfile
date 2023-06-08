FROM node:18-alpine AS frontend-builder

WORKDIR /build
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build



FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app
COPY backend/package*.json backend/prisma ./
RUN npm install --omit=dev && npx prisma generate
COPY backend/. .
COPY --from=frontend-builder /build/dist ./public

EXPOSE 3000
USER node
CMD node src/index.js
