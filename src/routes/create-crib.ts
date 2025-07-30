import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const createCrib: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/:cribId/create',
    {
      schema: {
        params: z.object({
          cribId: z.uuidv4()
        }),
        body: z.object({
          cribName: z.string().min(4).max(16),
        })
      }
    },
    async (req, res) => {
      const { cribId } = req.params
      const { cribName } = req.body

      try {
        const crib = await prisma.cribs.findUnique({
          where: { cribId }
        })

        if (crib) {
          return res.status(400).send({ error: 'Crib Already Created' })
        }

        const newCrib = await prisma.cribs.create({
          data: {
            cribId,
            cribName
          }, 
          select: {
            cribId: true,
            cribName: true,
            createdAt: true,
          }
        })

        return res.status(201).send(newCrib)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Create Crib'
        })
      }
    }
  )
}