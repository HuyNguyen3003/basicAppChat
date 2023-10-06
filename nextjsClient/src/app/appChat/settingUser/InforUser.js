import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function InforUser() {
  const [password,setpassword] = useState("")
  const [newPassword1,setnewPassword1] = useState("")

  let handleChanglePassword = () =>{
      const id = toast.loading("Pl,wait..", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
       

  }


  return (
    <div>
      <div className="m-2 text-xl">Thông tin người dùng</div>
      <div className="m-2">Tên:</div>
      <div className="m-2">Email:</div>
      <div className="m-2">Avatar:</div>
      <div>
        <div className="m-2">Đổi mật khẩu:</div>

        <input
          className="mx-2 p-1 rounded-xl"
          placeholder="Nhập mật khẩu cũ"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          className="mx-2 rounded-xl p-1"
          placeholder="Nhập mật khẩu mới"
          value={newPassword1}
          onChange={(e) => setnewPassword1(e.target.value)}
        />

        <button
          onClick={() => handleChanglePassword()}
          className="ml-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          Lưu
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
