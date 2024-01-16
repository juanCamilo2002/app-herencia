"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@ui/Loading/Loading';
import styles from './page.module.css'

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [session, status]);
  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [status, router])
  return (
    <>{
      loading ? <Loading />:<h1>Home page</h1>
    }
    </>
  )
}

