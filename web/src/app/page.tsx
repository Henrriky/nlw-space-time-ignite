import { cookies } from 'next/dist/client/components/headers';

import Copyright from '@/components/Copyright';
import Hero from '@/components/Hero';
import SignIn from '@/components/SignIn';
import EmptyMemories from '@/components/EmptyMemories';
import Profile from '@/components/Profile';

export default function Home() {
  return <EmptyMemories />
}
