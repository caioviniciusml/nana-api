import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getCrib: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId',
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
        const crib = await prisma.cribs.findUnique({
          select: {
            cribId: true,
            cribName: true,
            createdAt: true
          },
          where: { cribId }
        })

        if (!crib) {
          return res.status(404).send({ error: 'No Crib Data Found for This Crib ID' })
        }

        return res.status(200).send(crib)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Crib Data'
        })
      }
    }
  )
}