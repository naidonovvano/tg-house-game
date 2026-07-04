# ---------- Stage 1: Build Frontend ----------
FROM node:22-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


# ---------- Stage 2: Build Backend ----------
FROM node:22-alpine AS backend-builder

WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .
RUN npm run build


# ---------- Stage 3: Production ----------
FROM node:22-alpine

WORKDIR /app

COPY --from=backend-builder /backend/package*.json ./
RUN npm install --omit=dev

COPY --from=backend-builder /backend/dist ./dist
COPY --from=backend-builder /backend/.env.docker ./.env.docker

COPY --from=frontend-builder /frontend/dist ./frontend/dist

EXPOSE 3000

CMD ["node", "dist/main.js"]