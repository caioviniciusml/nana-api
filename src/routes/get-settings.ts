import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getSettings: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/settings',
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
        const lastSettings = await prisma.settings.findFirst({
          where: { cribId },
          orderBy: { id: 'desc' }
        })

        if (!lastSettings) {
          return res.status(404).send({ error: 'No Settings found for this Crib ID!' })
        }

        return res.status(200).send(lastSettings)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Settings!'
        })
      }
    }
  )
}