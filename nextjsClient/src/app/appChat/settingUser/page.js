"use client";
import React, { useState } from "react";
import InforUser from "./InforUser";
import InforApp from "./InforApp";
import Delete from "./Delete";
import { useRouter } from "next/navigation";

export default function SettingUser() {
  const router = useRouter()
  const [onSelect,setonSelect] = useState(1)

  let handleBack = () =>{
    router.push("/appChat");
  }
  return (
    <div className="flex min-h-screen cursor-default ">
      <div className="w-2/6 border-r-4 border-blue-500 min-h-screen">
        <div
          className="m-4 py-2 border-b-4 border-gray-400"
          onClick={() => handleBack()}
        >
          Quay lại
        </div>
        <div className="my-5 mx-2" onClick={() => setonSelect(1)}>
          Thông tin người dùng
        </div>
        <div className="my-5 mx-2 " onClick={() => setonSelect(2)}>
          Thông tin ứng dụng
        </div>
        <div className="my-5 mx-2" onClick={() => setonSelect(3)}>
          Xóa người dùng
        </div>
      </div>
      <div className="w-4/6">
        {onSelect === 1 ? (
          <InforUser />
        ) : onSelect === 2 ? (
          <InforApp />
        ) : onSelect === 3 ? (
          <Delete />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
