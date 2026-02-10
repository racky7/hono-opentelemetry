# Hono OpenTelemetry

A demo project showcasing distributed tracing, metrics, and log collection using [Hono](https://hono.dev/), [OpenTelemetry](https://opentelemetry.io/), and the [Grafana](https://grafana.com/) observability stack.

## Architecture

```text
┌──────────┐       ┌──────────────┐       ┌───────────┐
│  Hono    │──────▶│ Grafana      │──────▶│  Tempo    │ (traces)
│  App     │ OTLP  │ Alloy        │       ├───────────┤
│ :4000    │       │ :4318        │──────▶│Prometheus │ (metrics)
└──────────┘       │              │       ├───────────┤
                   │              │──────▶│  Loki     │ (logs)
                   └──────────────┘       └─────┬─────┘
                                                │
                                          ┌─────▼─────┐
                                          │  Grafana   │
                                          │  :3000     │
                                          └───────────┘
```

## Tech Stack

- **Hono** — Lightweight web framework running on Bun
- **OpenTelemetry** — Traces and metrics instrumentation
- **Pino** — Structured JSON logging with Loki transport
- **Grafana Alloy** — Telemetry collector (receives OTLP, routes to backends)
- **Tempo** — Distributed trace storage
- **Prometheus** — Metrics storage
- **Loki** — Log aggregation
- **Grafana** — Visualization dashboard

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) & Docker Compose

### Install dependencies

```sh
bun install
```

### Start the observability stack

```sh
docker compose up -d
```

### Run the app

```sh
bun run dev
```

### Try it out

```sh
# Health check
curl http://localhost:4000

# Roll 3 dice
curl http://localhost:4000/rolldice?rolls=3
```

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | Health check — returns `"Hello Hono!"` |
| `GET /rolldice?rolls=N` | Rolls N dice and returns the results |

## Dashboards & UIs

| Service | URL |
|---|---|
| App | <http://localhost:4000> |
| Grafana | <http://localhost:3000> |
| Prometheus | <http://localhost:9090> |
| Alloy | <http://localhost:12345> |

## Project Structure

```text
├── src/
│   ├── index.ts            # Hono app with API routes
│   ├── dice.ts             # Dice logic with OTel spans & metrics
│   └── lib/
│       └── logger.ts       # Pino logger setup
├── instrumentation.ts      # OpenTelemetry SDK configuration
├── alloy/
│   └── config.alloy        # Grafana Alloy pipeline config
├── prometheus/
│   └── prometheus.yaml     # Prometheus scrape config
├── tempo/
│   └── tempo.yaml          # Tempo storage config
├── docker-compose.yml      # Full observability stack
├── Dockerfile              # App container image (Bun)
└── package.json
```

## License

MIT
