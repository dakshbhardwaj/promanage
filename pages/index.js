import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session && session.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pro Manage AI</title>
        <meta name="description" content="ProManage AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navbar}>
        <div className={styles.signup}>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
