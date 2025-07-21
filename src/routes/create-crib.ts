import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const createCrib: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId',
    {
      schema: {
        params: z.object({
          cribId: z.string()
        }),
        body: z.object({
          cribName: z.string(),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { cribName } = req.body

      try {
        const crib = await prisma.cribs.create({
          data: {
            cribId,
            cribName
          }
        })

        return res.status(201).send(crib)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Create Crib!'
        })
      }
    }
  )
}