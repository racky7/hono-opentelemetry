import { pino, type Bindings } from 'pino'

export const logger = pino({
  level: 'debug',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'debug',
        options: {},
      },
    ],
  },
})

export const createLogger = (bindings: Bindings = {}) => logger.child(bindings)
