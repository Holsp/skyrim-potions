import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Skyrim alchemy</title>
      </Head>
      <div className={styles.wrapper}>
        <button onClick={() => router.push('/ingredientfinder')}>
          Find effects
        </button>
        <button onClick={() => router.push('/craftertwo')}>
          Find ingredients
        </button>
      </div>
      <div className={styles.imageWrapper}>
        <Image src="/images/Guard.png" alt="Skyrim guard" width={300} height={300}></Image>
      </div>

    </div>
  )
}

export default Home
