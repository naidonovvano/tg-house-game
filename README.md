# TG House Game

A Telegram Mini App project built with:

- React (Vite)
- NestJS
- PostgreSQL
- Docker
- Firebase Hosting

The project currently includes:

- Landing page
- REST API
- PostgreSQL database
- Dockerized development environment

# Getting Started

Follow these steps to run the project locally.

## Prerequisites

Make sure the following software is installed on your computer:

- Docker Desktop
- Git

---

## Clone the repository

```bash
git clone https://github.com/naidonovvano/tg-house-game.git
```

---

## Navigate to the project directory

```bash
cd tg-house-game
```

---

## Build and start the application

```bash
docker compose up --build
```

The first build may take a few minutes because Docker needs to download the required images and install dependencies.

---

## Open the application

After the containers are started, the following services will be available:

| Service | URL |
|---------|-----|
| Frontend (React + NestJS) | http://localhost:3000 |
| pgAdmin | http://localhost:5050 |

---

## Stop the application

To stop all running containers, press:

```text
Ctrl + C
```

or run:

```bash
docker compose down
```