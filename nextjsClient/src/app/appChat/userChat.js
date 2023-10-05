import React from 'react'

export default function UserChat(props) {
    const {img,name,msg} = props
  return (
    <div>
      <div className="flex">
        <div className="p-2">{img}</div>
        <div>
          <div>{name}</div>
          <div>{msg}</div>
        </div>
      </div>
    </div>
  );
}
