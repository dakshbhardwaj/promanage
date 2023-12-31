import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LogInForm from "../components/LogInForm";
import axios from "axios";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && session.user) {
      axios
        .post("https://promanage-fpft.onrender.com/user", {
          token: session.id_token,
        })
        .then((res) => {
          router.push("/dashboard");
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, router]);

  const onSignIn = () => {
    console.log("sign in");
    signIn("google");
  };

  return (
    <div>
      <Head>
        <title>Pro Manage AI</title>
        <meta name="description" content="ProManage AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogInForm onSignInClick={onSignIn} />
    </div>
  );
};

export default Home;
