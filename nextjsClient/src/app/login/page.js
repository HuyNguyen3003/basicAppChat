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
      <div className=" grid text-center  lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left ">
        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Trang Chủ
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Giới thiệu chi tiết về appChat .
          </p>
        </Link>

        <Link
          href="/dosApp"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800   "
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Giới Thiệu
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Đăng nhập vào ứng dụng để trò chuyện cùng bạn bè.
          </p>
        </Link>

        <Link
          href="/appChat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            appChat
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Truy cập vào ứng dụng để trò chuyện cùng bạn bè.
          </p>
        </Link>
      </div>
      <LoginPage />

      <div className="p-2"></div>
    </div>
  );
}
