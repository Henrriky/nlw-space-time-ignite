import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import Profile from '@/components/Profile'
import SignIn from '@/components/SignIn'
import Hero from '@/components/Hero'
import Copyright from '@/components/Copyright'
import { cookies } from 'next/headers'


const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: "700", variable: '--font-baijamjuree', })


export const metadata = {
  title: 'NLW Space Time',
  description: 'Uma cápsula do tempo construída com React, Next.js, Tailwind e Typescript',
}

export default function RootLayout({ children, }: { children: ReactNode }) {

  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
        <main className="grid grid-cols-2 min-h-screen">
          {/* Left */}
          <section className="relative flex flex-col items-start py-16 px-28 justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">

            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full "></div>

            {/* Stripes */}
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />

          </section>

          {/* Right */}
          <section className="flex max-h-screen overflow-y-scroll flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
