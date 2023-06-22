import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export default function middlware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;

    if(!token) { //Não libera para a rota que o usuário desejava acessar, redirecione ele para o login do github
        return NextResponse.redirect(signInURL, {
            headers: {
                'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`
            }
        })
    }

    return NextResponse.next(); //Libera a para a próxima que o cliente desejava acessar
}

export const config = {
    matcher: "/memories/:path*",  
}