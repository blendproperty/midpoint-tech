# Deployment (Docker + Traefik on a Hostinger VPS)

This assumes Traefik is already running on the target VPS as a separate, existing
service, attached to an external Docker network.

## 1. One-time setup

```bash
docker network create traefik-public
```

(Skip if it already exists, or set `TRAEFIK_NETWORK` to match your existing network name.)

```bash
cp .env.example .env
# edit .env: APP_DOMAIN, LETSENCRYPT_RESOLVER, TRAEFIK_NETWORK, EMAIL_PROVIDER, etc.
```

Point DNS for `APP_DOMAIN` at the VPS before requesting a certificate.

## 2. Build and start

```bash
docker compose up -d --build
```

Builds the multi-stage image (Next.js standalone output, non-root user,
healthcheck) and starts it on both the internal network and `traefik-public`, with
labels for HTTP→HTTPS redirect, TLS via the configured resolver, and routing
`Host(${APP_DOMAIN})` to container port 3000. Port 3000 is **not** published to the
host — all traffic flows through Traefik.

## 3. Verify

```bash
docker compose ps
docker compose logs -f web
curl -f https://<APP_DOMAIN>/api/health
```

## 4. Update / redeploy

```bash
git pull
docker compose up -d --build
```

## 5. Rolling back

```bash
git checkout <previous-tag-or-commit>
docker compose up -d --build
```

## 6. Stopping

```bash
docker compose down
```

## 7. Local, no-Traefik testing

```bash
docker compose -f docker-compose.dev.yml up --build
curl -f http://localhost:3000/api/health
```

## Diagnosing common issues

**404 from Traefik**
- Confirm the container is attached to the network Traefik watches.
- Confirm `traefik.enable=true` and the `Host()` rule matches exactly.
- Check Traefik's own logs for routing errors.

**502 Bad Gateway**
- Check `docker compose logs web` for startup errors (often a missing/invalid
  required env var — `src/lib/env.ts` throws on invalid config).
- Confirm the service port label matches the app's internal port (3000).
- Confirm the container listens on `0.0.0.0:3000`.

**TLS certificate errors**
- Confirm DNS resolves to the VPS before certificate issuance.
- Confirm `LETSENCRYPT_RESOLVER` matches your Traefik instance's configured resolver.
- Check Traefik logs for ACME challenge failures.

Do not run destructive cleanup commands (`docker system prune -a`, etc.) as part of
routine deployment.
