import Head from "next/head";
import LoginPage from "./LoginPage";
import Link from "next/link";


export default function Home() {
   
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen  mb-8">
      <Head>
        <title>Slider Login / Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <LoginPage />

      <div className="p-2"></div>
    </div>
  );
}
