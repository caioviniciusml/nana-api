import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getTemperatures: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/temperatures',
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
        const temperatures = await prisma.measures.findMany({
          select: { 
            id: true,
            temperature: true, 
            createdAt: true,
          },
          where: { cribId }
        })

        if (!temperatures) {
          return res.status(404).send({ error: 'No Temperatures found for this Crib ID!' })
        }

        return res.status(200).send(temperatures)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Temperatures!'
        })
      }
    }
  )
}