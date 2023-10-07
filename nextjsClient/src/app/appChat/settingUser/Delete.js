"use strict";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Delete() {

  let handleDelete = () => {
    const id = toast.loading("Pl,wait..", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   
  };
  return (
    <>
      <div className="m-2 text-xl">Xoá thông tin</div>
      <div className="m-2 mt-10">
        Nếu nhấn xóa tất cả thông tin tài khoảng của bạn sẽ mất ngay lập tức
      </div>
      <button
        onClick={() => handleDelete()}
        class="ml-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
      >
        Xóa
      </button>
      <ToastContainer />
    </>
  );
}
