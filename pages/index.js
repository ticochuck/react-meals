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

  const { data, error } = useSWR('https://swapi.dev/api/people/', fetcher)

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
        {data.results.map((item) => {
          return <h2 key={item.url}>hi, I am an {item.name}</h2>
        })}
        <h1>Hello World</h1>
      </main>
    </div>
  )
}
