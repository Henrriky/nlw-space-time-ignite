import { FastifyRequest, FastifyReply } from 'fastify';
// import { FastifyInstance } from 'fastify/types/instance';
import { prisma } from '../services/prisma';
import { z } from 'zod';

//Pegar memorias do usuario
export const getMemories = async (request: FastifyRequest) => {


    const memories = await prisma.memory.findMany({
        where: {
          userId: request.user.sub,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
  
      return memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 115).concat("..."),
          createAt: memory.createdAt
        };
      });
}

//Pegar memoria se ela for do usuario ou se ela for publica
export const getMemory = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
      });
  
      const { id } = paramsSchema.parse(request.params);
  
      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (!memory.isPublic && memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      return memory;
}

//Criar uma memoria do usuario logado
export const createMemory = async (request: FastifyRequest) => {
    const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      });
  
      const { content, coverUrl, isPublic } = bodySchema.parse(request.body);
  
      const memory = await prisma.memory.create({
        data: {
          userId: request.user.sub,
          content,
          coverUrl,
          isPublic,
        },
      });
  
      return memory;
}

//Atualizar uma memoria somente se ela for do usuario
export const updateMemory = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
      });
  
      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      });
  
      const { id } = paramsSchema.parse(request.params);
      const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

      let memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        }
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send();
      }
  
      memory = await prisma.memory.update({
        where: {
            id,
        },
        data: {
            content,
            coverUrl,
            isPublic
        }
      })
  
      return memory;
}

export const deleteMemory = async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
      });
  
      const { id } = paramsSchema.parse(request.params);

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        }
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send();
      }
  
      await prisma.memory.delete({
        where: {
          id,
        },
      });

      return { message: "Memory deleted successfully"};
}