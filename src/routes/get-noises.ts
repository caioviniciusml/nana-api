import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getNoises: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/noises',
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
        const noises = await prisma.measures.findMany({
          select: { 
            id: true,
            noise: true, 
            createdAt: true,
          },
          where: { cribId }
        })

        if (!noises) {
          return res.status(404).send({ error: 'No Noise Levels found for this Crib ID!' })
        }

        return res.status(200).send(noises)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Noise Levels!'
        })
      }
    }
  )
}