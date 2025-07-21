import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const createNotification: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/notification',
    {
      schema: {
        params: z.object({
          cribId: z.string()
        }),
        body: z.object({
          type: z.string(),
          extra: z.string(),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { type, extra } = req.body

      try {
        const notification = await prisma.notifications.create({
          data: {
            cribId,
            type,
            extra
          }
        })

        return res.status(201).send(notification)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Create Notification!'
        })
      }
    }
  )
}