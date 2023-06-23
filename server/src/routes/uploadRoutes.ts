import { FastifyInstance } from 'fastify';
import { upload } from '../controllers/uploadController';;

export async function uploadRoutes (app: FastifyInstance) {

    app.post('/upload', (request, reply) => upload(request, reply, app));

}