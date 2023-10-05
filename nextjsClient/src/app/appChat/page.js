"use client";

import React, { useEffect,useState } from "react";
import UserChat from "./userChat";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs";
import SearchMsg from "./SearchMsg";
import ShowMsg from "./ShowMsg";
import axios from "axios";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";





export default function page() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  

  useEffect(()=>{
      const log = localStorage.getItem("log");
      const _id = localStorage.getItem("_id");
      const date = new Date().getDate();
      const key = process.env.KEY;
   // checkKey(log, date, key, _id);
    
  })

   const handleEmojiSelect = (emoji) => {
         setMessage(message + '' + emoji.native);

   };

  let sendAddress=async()=>{
  
      const response = await axios.get(
        "https://ipinfo.io?token=e24ebd493f5e78"
      );
      const data = response.data;

      setMessage(message + " " + data.city + "," + data.country + " |" +  data.ip);

  
  }
  let checkKey = async (log, date, key, _id) => {
    const id = toast.info("Tài khoảng chưa được lưu mời bạn đăng nhập", {
      autoClose: 3000,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const passwordMatch = await bcrypt.compare(
      `${key}/${date}/${_id}`,
      `${log}`
    );
    if (passwordMatch === false) {
      localStorage.setItem("name", "");
      localStorage.setItem("_id", "");
      localStorage.setItem("log", "");
      router.push("/login");
    } else {
      toast.update(id, {
        render: "Xác thực thành công",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  let handleLogout = () => {
    try {
      localStorage.setItem("name", "");
      localStorage.setItem("_id", "");
      localStorage.setItem("log", "");
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <main className="flex min-h-screen flex-col ">
      <div className="flex min-h-screen ">
        <div className="w-2/6">
          <div className="flex">
            <div className="p-2 w-1/5 flex flex-col ">
              <div className="flex-grow">
                <div className="py-4">Hình cá nhân</div>
                <div className="py-4">Tin nhắn</div>
                <div className="py-4">Store</div>
              </div>
              <div className="">
                <div className="py-4">Setting</div>
                <button onClick={() => handleLogout()} className="py-4">
                  Đăng xuất
                </button>
              </div>
            </div>
            <div className=" border-l-4 border-blue-500 min-h-screen ">
              <div className="flex">
                <div className="p-2">
                  <input className="p-2 " placeholder="Tìm kiếm tin nhắn" />
                </div>
                <div className="p-2 flex">
                  <button className="pl-2">Thêm bạn</button>
                  <button className="pl-2">Thêm nhóm</button>
                </div>
              </div>
              <div className="p-2">
                list user
                <UserChat name={"a"} img={123} msg={"Bạn: alo"} />
                <UserChat name={"b"} img={123} msg={"b:123"} />
                <UserChat name={"c"} img={123} msg={"c:123"} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/6 border-l-4 border-blue-500  ">
          <div className="flex py-5 my-5 border-b-2 border-blue-500">
            <div className="px-4">img</div>
            <div className="pl-4">iuquai</div>
            <div className="flex absolute right-0 h-full">
              <div className="pr-2">
                <SearchMsg />
              </div>
              <div className="pr-2">gọi thoại</div>
              <div className="pr-2">gọi video</div>
              <div className="pr-2">thông tin</div>
            </div>
          </div>

          <div className="flex-grow min-h-[71%]">
            <ShowMsg />
            <div className="">
              {showEmojiPicker && (
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              )}
            </div>
          </div>

          <div>
            <div className="border-t-2 border-blue-500 py-3 flex ">
              <div className="px-2">gửi img</div>
              <div className="px-2">
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  Emoji
                </button>
              </div>
              <button onClick={() => sendAddress()} className="px-2">
                gửi địa chỉ
              </button>
              <div className="px-2">đổi hình đoạn chat</div>
            </div>
            <div className=" flex border-t-2 border-blue-500">
              <input
                className="py-3 pl-2 px-2 w-full"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button className="px-2">Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
