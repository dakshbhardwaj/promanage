import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LogInForm from "../components/LogInForm";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session);
    if (session && session.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const onSignIn = () => {
    console.log("sign in");
    signIn("google");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pro Manage AI</title>
        <meta name="description" content="ProManage AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogInForm onSignInClick={onSignIn} />

      {/* <nav className={styles.navbar}>
        <div className={styles.signup}>
          <button onClick={() => onSignIn()}>Sign in with Google</button>
        </div>
      </nav> */}
    </div>
  );
};

export default Home;
