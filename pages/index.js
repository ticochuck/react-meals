import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import axios from 'axios'


const fetcher = async (url) => {
  
  const response = await axios.get(url);

  console.log(response.data);

  return response.data;
}


export default function Home() {

  // const url = 'https://drf-snacks-api.herokuapp.com/api/v1/snacks/';
  const url = 'http://127.0.0.1:8000/api/v1/meals/';

  const { data, error } = useSWR((url), fetcher)

  console.log(error);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Meals API</h1>
        {data.map((item) => {
          return <h2 key={item.id}>Meal name: {item.name}</h2>
        })}
      </main>
    </div>
  )
}
