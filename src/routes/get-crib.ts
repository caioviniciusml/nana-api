import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const getCrib: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/:cribId',
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
        const crib = await prisma.cribs.findFirst({
          where: { cribId }
        })

        if (!crib) {
          return res.status(404).send({ error: 'No Crib Data found for this Crib ID!' })
        }

        return res.status(200).send(crib)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Get Crib Data!'
        })
      }
    }
  )
}