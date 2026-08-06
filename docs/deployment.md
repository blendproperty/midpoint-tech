# Deployment

Midpoint Tech runs as a single Docker container behind an **existing** Traefik reverse proxy. This document assumes Traefik is already running elsewhere on the host and exposes an external Docker network.

## 1. One-time setup

Create the external Traefik network (skip if it already exists):

```bash
docker network create traefik-public
```

Copy and configure environment variables:

```bash
cp .env.example .env
# edit .env — set APP_DOMAIN, LEADS_WEBHOOK_URL, etc.
```

## 2. Build

```bash
docker compose build
```

## 3. Start

```bash
docker compose up -d
```

## 4. View logs

```bash
docker compose logs -f web
```

## 5. Check health

```bash
docker compose ps
curl -f http://localhost:3000/api/health   # from inside the host network, or via the container directly
docker inspect --format='{{json .State.Health}}' midpoint-tech
```

## 6. Restart

```bash
docker compose restart web
```

## 7. Update (deploy a new version)

```bash
git pull
docker compose build web
docker compose up -d web
```

## 8. Roll back

```bash
git checkout <previous-tag-or-commit>
docker compose build web
docker compose up -d web
```

## 9. Stop the application

```bash
docker compose down
```

(This stops and removes the `web` container and the `internal` network only — it does not touch the external `traefik-public` network or Traefik itself.)

## Confirming Traefik routing

```bash
# Check Traefik has picked up the router
curl -s http://<traefik-host>:8080/api/http/routers | grep midpoint-tech

# Confirm HTTPS works end-to-end
curl -I https://tech.mid-point.co.za
```

## Diagnosing common issues

**404 from Traefik** — the router rule's `Host()` doesn't match the request, or the container isn't on the `traefik-public` network. Check `docker network inspect traefik-public` includes the `midpoint-tech` container.

**502 Bad Gateway** — the container is unhealthy or not listening on port 3000. Check `docker compose logs web` and confirm `traefik.http.services.midpoint-tech.loadbalancer.server.port=3000` matches the app's internal port.

**TLS certificate errors** — confirm `LETSENCRYPT_RESOLVER` matches a certificate resolver actually configured on the Traefik instance, and that DNS for `APP_DOMAIN` points at the host before requesting a certificate (Let's Encrypt rate-limits failed attempts).

## Local development without Docker

```bash
npm install
npm run dev
```

## Local preview with Docker, without Traefik

```bash
docker compose -f docker-compose.dev.yml up --build
# visit http://localhost:3000
```

## What NOT to do

Do not run destructive cleanup commands (`docker system prune -a`, `docker volume prune`) as part of routine deployment — they can affect other services sharing the host or the Traefik network. If cleanup is genuinely needed, do it deliberately and separately from a deploy.
