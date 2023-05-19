import { FastifyInstance } from "fastify";
import { getMemories, getMemory, createMemory, updateMemory, deleteMemory } from "../controllers/memoriesControllers";

export async function memoriesRoutes(app: FastifyInstance) {

  app.get("/memories", getMemories);
  app.get("/memories/:id", getMemory);

  app.post("/memories", createMemory);
  app.put("/memories/:id", updateMemory);

  app.delete("/memories/:id", deleteMemory); 
  
}
