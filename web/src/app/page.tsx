import Copyright from '@/components/Copyright';
import Hero from '@/components/Hero';
import SignIn from '@/components/SignIn';
import EmptyMemories from '@/components/EmptyMemories';

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
       <section className="relative flex flex-col items-start py-16 px-28 justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
          
          {/* Blur */}
          <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full "></div>
          
          {/* Stripes */}
          <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes"/>
          
          <SignIn/>
          <Hero/>
          <Copyright/>
          
       </section>

       {/* Right */}
       <section className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
          <EmptyMemories/>
       </section>
    </main>
  )
}
