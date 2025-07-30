import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const sendFanData: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/settings/fan',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
        body: z.object({
          fanAutoMode: z.boolean(),
          fanSpeed: z.number(),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { fanAutoMode, fanSpeed } = req.body

      try {
        const lastSettings = await prisma.settings.findFirst({
          where: { cribId },
          orderBy: { id: 'desc' }
        })

        if (!lastSettings) {
          return res.status(400).send({ error: "This Crib Doesn't Have Previous Settings" })
        }

        const newSettings = await prisma.settings.create({
          data: {
            cribId,
            coldThreshold: lastSettings.coldThreshold,
            warmThreshold: lastSettings.warmThreshold,
            fanAutoMode,
            fanSpeed
          }
        })

        return res.status(201).send(newSettings)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Update Fan Settings'
        })
      }
    }
  )
}