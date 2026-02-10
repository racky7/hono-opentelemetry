import { Hono } from 'hono'
import { rollTheDice } from './dice'
import { metrics, trace } from '@opentelemetry/api'
import { logger } from './lib/logger'

const tracer = trace.getTracer('dice-server', '0.1.0')
const meter = metrics.getMeter('dice-server', '0.1.0')

const app = new Hono()

app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  .get('/rolldice', (c) => {
    logger.info('roll dice api hit ')
    const histogram = meter.createHistogram('task.duration')
    const startTime = new Date().getTime()

    const rolls = c.req.query().rolls
      ? parseInt(c.req.query().rolls.toString())
      : NaN

    if (isNaN(rolls)) {
      logger.error('Request parameter "rolls" is missing or not a number.')
      return c.json(
        {
          error: "Request parameter 'rolls' is missing or not a number.",
        },
        400
      )
    }

    const endTime = new Date().getTime()
    const executionTime = endTime - startTime
    histogram.record(executionTime)

    return c.text(JSON.stringify(rollTheDice(rolls, 1, 6)))
  })

export default {
  port: 4000,
  fetch: app.fetch,
}
