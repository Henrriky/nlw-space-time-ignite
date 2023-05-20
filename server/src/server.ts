import 'dotenv/config'

import fastify from 'fastify';
import cors from '@fastify/cors';
import { memoriesRoutes } from './routes/memoriesRoutes';
import { authRoutes } from './routes/authRoutes';

const app = fastify();

// CONFIGURAÇÃO DO CORS
app.register(cors, {
    origin: true
})

// REGISTRO DAS ROTAS
app.register(authRoutes);
app.register(memoriesRoutes);

// LISTEN DA PORTA 3333
app.listen({ 
    port: 3333,
}).then(() => {
    console.log("😎 HTTP server listening on port http://localhost:3333 😎")
})





// app.listen({ port: 3333 }, () => {

// })