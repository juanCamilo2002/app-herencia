"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import Left from '@ui/login/Left/Left';
import Right from '@ui/login/Right/Right';
import styles from './page.module.css';
import Loading from './loading';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() =>{
    if(session){
      router.push("/dashboard")
    }
  },[status, router, session])
  return (
    <Suspense fallback={<Loading/>}>
      <div className={styles.container}>
      <Left/>
      <Right />
    </div>
    </Suspense>
  )
}

export default Page
