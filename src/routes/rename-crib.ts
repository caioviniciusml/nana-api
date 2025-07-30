import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { prisma } from '../db/connection.ts'

export const renameCrib: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/:cribId/rename',
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

        if (!crib) {
          return res.status(404).send({ error: "This Crib Doesn't Exists" })
        }

        const updatedCrib = await prisma.cribs.update({
          select: {
            cribId: true,
            cribName: true,
            createdAt: true
          },
          data: {
            cribName: cribName
          },
          where: { cribId }
        })

        return res.status(200).send(updatedCrib)
      } catch (err) {
        return res.status(500).send({
          error: 'Internal Server Error, Failed to Rename Crib'
        })
      }
    }
  )
}