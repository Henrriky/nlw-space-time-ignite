import { FastifyInstance } from 'fastify';
import { register } from '../controllers/authController';

export async function authRoutes (app: FastifyInstance) {

    app.post('/register', request => register(request, app));

}