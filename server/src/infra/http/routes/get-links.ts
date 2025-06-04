import { Readable, Transform } from 'node:stream'
import type { LinkProps } from '@/app/functions/get-links'
import { getLinksFn } from '@/functions/get-links'
import { redis } from '@/redis'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        response: {
          200: z.instanceof(Readable).describe('A list of links'),
        },
      },
    },
    async (request, reply) => {
      const cursor = getLinksFn()

      const transformStream = new Transform({
        objectMode: true,
        async transform(chunk: LinkProps, encoding, callback) {
          try {
            const numberOfAccess = Number.parseInt(
              (await redis.get(chunk.url_shortened)) ?? '0'
            )
            const link = {
              urlShortened: chunk.url_shortened,
              urlOriginal: chunk.url_original,
              numberOfAccess,
              createdAt: chunk.created_at,
            }
            // Envia como JSON stringificado, seguido de newline
            this.push(`${JSON.stringify(link)}\n`)
            callback()
          } catch (err) {
            callback(err as Error)
          }
        },
      })

      reply.header('content-type', 'text/plain')
      reply.header('access-control-allow-origin', '*')

      // Retorna a stream diretamente
      return reply.send(cursor.pipe(transformStream))
    }
  )
}