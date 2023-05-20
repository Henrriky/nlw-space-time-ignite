import { FastifyRequest } from 'fastify';
import { prisma } from '../services/prisma';
import { z } from 'zod';

export const getMemories = async () => {
    const memories = await prisma.memory.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
  
      return memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 115).concat("..."),
        };
      });
}
export const getMemory = async (request: FastifyRequest) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
      });
  
      const { id } = paramsSchema.parse(request.params);
  
      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return memory;
}

export const createMemory = async (request: FastifyRequest) => {
    const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      });
  
      const { content, coverUrl, isPublic } = bodySchema.parse(request.body);
  
      const memory = await prisma.memory.create({
        data: {
          userId: "2892f57d-875d-4fea-8ef6-e8d9ca89fa16",
          content,
          coverUrl,
          isPublic,
        },
      });
  
      return memory;
}
export const updateMemory = async (request: FastifyRequest) => {
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
  
      const memory = await prisma.memory.update({
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
export const deleteMemory = async (request: FastifyRequest) => {
    const paramsSchema = z.object({
        id: z.string().uuid(),
      });
  
      const { id } = paramsSchema.parse(request.params);
  
      const memory = await prisma.memory.delete({
        where: {
          id,
        },
      });
      return memory;
}