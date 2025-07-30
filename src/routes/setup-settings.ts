import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const setupSettings: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/settings/setup',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
        body: z.object({
          coldThreshold: z.number(),
          warmThreshold: z.number(),
          fanAutoMode: z.boolean(),
          fanSpeed: z.number(),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { coldThreshold, warmThreshold, fanAutoMode, fanSpeed } = req.body

      try {
        const settings = await prisma.settings.findFirst({
          where: { cribId },
          orderBy: { id: 'desc' }
        })

        if (settings) {
          return res.status(400).send({ error: "This Crib Settings Were Already Setup" })
        }

        const initSettings = await prisma.settings.create({
          data: {
            cribId,
            coldThreshold,
            warmThreshold,
            fanAutoMode,
            fanSpeed
          }
        })

        return res.status(201).send(initSettings)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Setup Settings'
        })
      }
    }
  )
}