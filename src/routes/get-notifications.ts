import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getNotifications: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/notifications',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params

      try {
        const notifications = await prisma.notifications.findMany({
          where: { cribId },
          orderBy: { id: 'desc' },
          take: 20
        })

        if (notifications.length === 0) {
          return res.status(404).send({ error: 'No Notifications found for this Crib ID' })
        }

        return res.status(200).send(notifications)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Notifications'
        })
      }
    }
  )
}