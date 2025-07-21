import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getNotifications: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/notifications',
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
        const notifications = await prisma.notifications.findMany({
          where: { cribId }
        })

        if (!notifications) {
          return res.status(404).send({ error: 'No Notifications found for this Crib ID!' })
        }

        return res.status(200).send(notifications)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Notifications!'
        })
      }
    }
  )
}