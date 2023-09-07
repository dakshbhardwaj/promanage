import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LogInForm from "../components/LogInForm";

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
    <div>
      <Head>
        <title>ProManage AI</title>
        <meta name="description" content="ProManage AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogInForm />
    </div>
  );
};

export default Home;
