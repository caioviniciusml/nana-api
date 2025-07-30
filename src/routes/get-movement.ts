import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getMovement: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId/movement',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
      }
    },
    async (req, res) => {
      const { cribId } = req.params

      try {
        const movement = await prisma.measures.findFirst({
          select: {
            id: true,
            movement: true,
            createdAt: true,
          },
          where: { cribId },
          orderBy: { id: 'desc' }
        })

        if (!movement) {
          return res.status(404).send({ error: 'No Movement Data Found for This Crib ID' })
        }

        return res.status(200).send(movement)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Movement Data'
        })
      }
    }
  )
}