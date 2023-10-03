"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import bcrypt from "bcryptjs";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusK, setstatusK] = useState(0);
  const router = useRouter();

  const checkKey = async (log, date, key,name) => {
    const passwordMatch = await bcrypt.compare(`${key}/${date}`, `${log}`);
    if (passwordMatch === true) {
      setstatusK(1);
      toast(`Chào: ${name}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>router.push("/appChat"),2000)
      
    } else {
      localStorage.setItem("infor", "");
      localStorage.setItem("log", "");
    }
  };

  useEffect(() => {
    const log = localStorage.getItem("log");
    const name = localStorage.getItem("name");
    

    const date = new Date().getDate();
    const key = process.env.KEY;
    checkKey(log, date, key, name);
  }, [statusK]);

  let handleLoginSS = async (_id, name) => {
    const date = new Date().getDate();
    const key = process.env.KEY;
    const hashedPassword = await bcrypt.hash(`${key}/${date}`, 10);
    localStorage.setItem("log", hashedPassword);
    localStorage.setItem("name", name);
    localStorage.setItem("_id", _id);

    setTimeout(() => router.push("/appChat"), 2000);  
  };

  let handleLogin = async () => {
    const id = toast.loading("Please wait...", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (!email || !password) {
      toast.update(id, {
        render: "Thiếu trường dữ liệu",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const msg = { email, password };
      const data = { msg };
      try {
        const res = await axios.post(
          "http://localhost:5000/apiGetway/login/readdata",
          data
        );
       setEmail("")
       setPassword("")
        if (res.data.status === 0) {
          toast.update(id, {
            render: "Sai địa chỉ email",
            type: "error",
            isLoading: false,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (res.data.status === true) {
          toast.update(id, {
            render: "Đăng nhập thành công",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleLoginSS(res.data._id, res.data.username);
        }

        if (res.data.status === -1) {
          toast.update(id, {
            render: "Sai mật khẩu",
            type: "error",
            isLoading: false,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        toast.update(id, {
          render: "Lỗi đăng nhập",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(e);
      }
    }
  };

  return (
    
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Chào mừng trở lại!
              </h1>

              <div className="mt-12">
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <button
                  onClick={() => handleLogin()}
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {" "}
                Quên mật khẩu?{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SigninForm;
