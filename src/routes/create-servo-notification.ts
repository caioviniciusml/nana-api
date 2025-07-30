import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const createServoNotification: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/notification/servo',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
        body: z.object({
          type: z.literal("servo")
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { type } = req.body

      try {
        const crib = await prisma.cribs.findUnique({
          where: { cribId }
        })

        if (!crib) {
          return res.status(400).send({ error: "This Crib Doesn't Exists" })
        }

        const servoNotification = await prisma.notifications.create({
          data: {
            cribId,
            type,
            extra: "swing"
          }
        })

        return res.status(201).send(servoNotification)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Create Servo Notification'
        })
      }
    }
  )
}