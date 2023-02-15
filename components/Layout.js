import Head from "next/head";
import styles from "./layout.module.css"
import utilStyle from "../styles/utils.module.css"
import Link from "next/link";

const name = "Ryuki"
export const siteTitle = "Next.js blog"

function Layout({children, home}) {
  return (
    <div className={ styles.container }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img 
              src="/images/profile.png" 
              alt="profile image"
              className={`${utilStyle.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img 
              src="/images/profile.png" 
              alt="profile image"
              className={`${utilStyle.borderCircle} ${styles.headerImage}`}
            />
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
          </>
        )}

      </header>
      <main>
        {children}
      </main>
      {!home && (
        <div>
          <Link href="/" className={styles.linkText}>← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;