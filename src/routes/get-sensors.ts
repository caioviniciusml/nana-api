import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getSensors: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/sensors',
    {
      schema: {
        params: z.object({
          cribId: z.string()
        }),
      }
    },
    async (req, res) => {
      const { cribId } = req.params

      try {
        const latestSensorsResult = await prisma.sensors.findFirst({
          where: { cribId: cribId },
          orderBy: { createdAt: 'desc' }
        })

        if (!latestSensorsResult) {
          return res.status(404).send({ error: 'No Sensors Data found for this Crib ID!' })
        }

        return res.status(200).send(latestSensorsResult)
      } catch (err) {
        return res.status(500).send({
          error: 'Failed to insert Data!'
        })
      }
    }
  )
}