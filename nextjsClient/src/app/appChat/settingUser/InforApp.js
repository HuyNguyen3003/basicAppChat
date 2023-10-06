import React, { useEffect } from 'react'
import axios from 'axios'

export default function InforApp() {
  useEffect(()=>{

  },[])
  return (
    <div className=" relative min-h-screen">
      <div className="m-2 text-xl">Thông tin ứng dụng</div>
      <div className="m-2">Tổng số tin nhắn:</div>
      <div className="m-2">Người nhắn tin nhiều nhất:</div>
      <div className="m-2">Số tin nhắn trong store:</div>
      <div className="m-2 absolute bottom-0 right-0">BasicAppChat V1.1</div>
    </div>
  );
}
