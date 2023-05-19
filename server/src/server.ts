import fastify from 'fastify';
import { memoriesRoutes } from './routes/memoriesRoutes';
const app = fastify();

app.register(memoriesRoutes);


app.listen({ 
    port: 3333,
}).then(() => {
    console.log("😎 HTTP server listening on port http://localhost:3333 😎")
})





// app.listen({ port: 3333 }, () => {

// })