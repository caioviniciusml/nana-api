import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const sendData: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/data',
    {
      schema: {
        params: z.object({
          cribId: z.string()
        }),
        body: z.object({
          tempSensorStatus: z.boolean(),
          movSensorStatus: z.boolean(),
          noiseSensorStatus: z.boolean(),
          temperature: z.number(),
          movement: z.boolean(),
          noise: z.number(),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const {
        tempSensorStatus,
        movSensorStatus,
        noiseSensorStatus,
        temperature,
        movement,
        noise
      } = req.body
      const createdAt = new Date()

      try {
        const newSensorsStatus = await prisma.sensors.create({
          data: {
            cribId,
            tempSensorStatus,
            movSensorStatus,
            noiseSensorStatus,
            createdAt
          }
        })

        const newMeasures = await prisma.measures.create({
          data: {
            cribId,
            temperature,
            movement,
            noise,
            createdAt
          }
        })

        return res.status(201).send({
          newSensorsStatus,
          newMeasures
        })
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Insert Data!'
        })
      }
    }
  )
}