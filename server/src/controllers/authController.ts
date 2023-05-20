import { FastifyRequest } from 'fastify';
import { prisma } from '../services/prisma';
import { z } from 'zod';
import axios from 'axios';

export const register = async (request: FastifyRequest) => {

    const bodySchema = await z.object({
        code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    //Pegando token de acesso para conseguir pegar os dados do usuário
    const accessTokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        null,
        {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                code,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
            },
            headers: {
                Accept: 'application/json',
            }
        }
    )

    const { access_token } = accessTokenResponse.data

    if (!access_token) {
        return { message: 'access_token does not exist'}
    }

    //Acessando dados do usuario com o access_token
    const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `bearer ${access_token}`,
        }
    })
    
    const userSchema = z.object({
        id: z.number(),
        login: z.string(),
        name: z.string(),
        avatar_url: z.string().url()
    })
    
    const userInfo = userSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
        where: {
            githubId: userInfo.id,
        }
    })

    if(!user) {
        user = await prisma.user.create({
            data: {
                githubId: userInfo.id,
                avatarUrl: userInfo.avatar_url,
                name: userInfo.name,
                login: userInfo.login
            }
        })
    }

    return {
        user
    }



    

}