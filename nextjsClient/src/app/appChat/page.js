import React from "react";
import UserChat from "./userChat";


export default function page() {
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
                <div className="py-4">Đăng xuất</div>
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
            <div>img</div>
            <div>name</div>
            <div className="flex absolute right-0 h-full">
              <div className="pr-2">tìm tin nhắn</div>
              <div className="pr-2">gọi thoại</div>
              <div className="pr-2">gọi video</div>
              <div className="pr-2">thong tin</div>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <div className="flex-grow">hiện thị tin nhắn</div>

            <div>
              <div className="border-t-2 border-blue-500 py-3 flex ">
                <div className="px-2">gửi img</div>
                <div className="px-2">gửi emoji, sticker , gif</div>
                <div className="px-2">gửi địa chỉ</div>
                <div className="px-2">đổi hình đoạn chat</div>
              </div>
              <div className=" flex border-t-2 border-blue-500">
                <input className="py-3 pl-2 px-2 w-full" />
                <button className="px-2">Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
