import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getMovements: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/movements',
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
        const movements = await prisma.measures.findMany({
          select: {
            id: true,
            movement: true,
            createdAt: true,
          },
          where: { cribId }
        })

        if (!movements) {
          return res.status(404).send({ error: 'No Movements found for this Crib ID!' })
        }

        return res.status(200).send(movements)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Movements!'
        })
      }
    }
  )
}