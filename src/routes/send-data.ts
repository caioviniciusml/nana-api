import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'
import { handleNotifications } from '../models/notifications-model.ts'

export const sendData: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/data',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
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
        const crib = await prisma.cribs.findUnique({
          where: { cribId }
        })

        if (!crib) {
          return res.status(404).send({ error: "This Crib Doesn't Exists" })
        }

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

        handleNotifications({ ...newSensorsStatus, ...newMeasures })

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