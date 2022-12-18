import Head from 'next/head'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import utilStyle from "../styles/utils.module.css"
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post'

// SSG
export async function getStaticProps() {
  const allPostsData = getPostsData()
  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <>
      <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <section>
          <p className={utilStyle.headingMd}>Next.js学習中の弱々エンジニアです</p>
        </section>
        <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
          <h2>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({id, title, date, thumbnail}) => (
              <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyle.boldText}>{title}</p>
              </Link>
              <small className={utilStyle.lightText}>{date}</small>
            </article>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}
