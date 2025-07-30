import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getSensors: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/sensors',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
      }
    },
    async (req, res) => {
      const { cribId } = req.params

      try {
        const lastSensorsStatus = await prisma.sensors.findFirst({
          where: { cribId },
          orderBy: { id: 'desc' }
        })

        if (!lastSensorsStatus) {
          return res.status(404).send({ error: 'No Sensors Status Found for This Crib ID' })
        }

        return res.status(200).send(lastSensorsStatus)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Sensors Status'
        })
      }
    }
  )
}