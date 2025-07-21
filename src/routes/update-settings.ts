import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const updateSettings: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/settings',
    {
      schema: {
        params: z.object({
          cribId: z.string()
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
        if (coldThreshold >= warmThreshold){
          return res.status(400).send({ error: 'Bad Request, Cold Threshold must be lower than Warm Threshold!'})
        }

        const settings = await prisma.settings.create({
          data: {
            cribId,
            coldThreshold,
            warmThreshold,
            fanAutoMode,
            fanSpeed
          }
        })

        return res.status(201).send(settings)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Update Settings!'
        })
      }
    }
  )
}