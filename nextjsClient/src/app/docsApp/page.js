import Link from "next/link";

export default function DocsApp() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 bg-gray-100 ">
      <div className="flex justify-between 	">
        <div className="border border-gray-300 rounded-lg p-4 bg-cyan-500">
          <Link
            href="/"
            className="group block transition-colors    "
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Trang Chủ
              <span className="inline-block transition-transform  ">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Trở về trang chủ.
            </p>
          </Link>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-teal-500">
          <Link
            href="/login"
            className="group block transition-colors   "
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Đăng Nhập
              <span className="inline-block transition-transform  ">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Đăng nhập vào ứng dụng để trò chuyện cùng bạn bè.
            </p>
          </Link>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 bg-slate-200 bg-green-500">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group block transition-colors    "
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              appChat
              <span className="inline-block transition-transform  ">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Truy cập vào ứng dụng để trò chuyện cùng bạn bè.
            </p>
          </a>
        </div>
      </div>
      <br />
      <hr />
      <div className=" p-4 rounded-lg">
        <div className="text-2xl font-bold mb-4">Giới Thiệu</div>
        <div className="text-lg mb-2">
          APPChat{" "}
          <Link
            href="https://github.com/HuyNguyen3003/basicAppChat"
            target="_blank"
          >
            <span className="text-blue-500 underline text-black">
              (Link sourc code)
            </span>
          </Link>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="pl-16">
          <div className="text-2xl font-bold mb-4">Mô hình MVC</div>
          <div className="text-sm mb-4">M: ASP.NET -v:7</div>
          <div className="text-sm mb-4">V: NEXTJS -v:13</div>
          <div className="text-sm mb-4">C: NODE -v:18</div>
        </div>
        <div className="pr-72">
          <div className="text-2xl font-bold mb-4">Cách sử dụng:</div>
          <div className="text-sm mr-4">
            Người dùng vào client phải login để có quyền sử dụng.{" "}
            <div>
              Nếu chưa có account thì tạo người dùng mới rồi login để có quyền
              sử dụng appChat.
            </div>
            <div>
              người dùng không hoạt động sau 1 time nào đó phải login lại.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="pl-16">
          <div className="text-2xl font-bold mb-4">Công nghệ sử dụng:</div>
          <div className="text-sm mb-4">
            <ul>
              <li>
                Công nghệ sử dụng: nodejs, nextjs, asp.net, rabbitmq,
                elasticSearch, redis, googleAPI, mongodb, googleAPI
              </li>
              <li>nextjs: Hiển thị dữ liệu.</li>
              <li>nodejs: Điều khiển sự tương tác của nextjs và asp.</li>
              <li>asp: Quản lý xử lý các dữ liệu.</li>
              <li>
                rabbitmq: Nhận và gửi msg theo event để truyền dữ liệu từ node
                sang asp.
              </li>
              <li>elasticSearch: Tối ưu việc search dữ liệu.</li>
              <li>redis: Lưu trữ dữ liệu thường xuyên update.</li>
              <li>mongodb: Hệ quản trị cơ sở dữ liệu.</li>
              <li>googleAPI: Lưu trữ dữ liệu.</li>
              <li>kibana: Giao diện cho elasticSearch</li>
            </ul>
          </div>
        </div>
        <div className="pl-20">
          <div className="text-2xl font-bold mb-4">Chức năng dự kiến:</div>
          <div className="text-sm mb-4">
            <ul>
              <li>Gửi msg realtime (1 người, cả nhóm).</li>
              <li>Gửi img, sticker và emoji, vị trí.</li>
              <li>Tùy chỉnh giao diện, thông báo tin nhắn.</li>
              <li>Tìm kiếm tin nhắn Gọi thoại</li>
            </ul>
          </div>
          <div className="text-2xl font-bold mb-4">
            Luồn hoạt động từng service:
          </div>
          <div className="text-sm mb-4">
            <ul>
              <li>nextClient: Giao diện</li>
              <li>
                expressLogin: Sử lí login, register. Khi api được gọi từ client
                service sẽ get data từ elastichSearch rồi return{" "}
                <code>{`{type:...,info...}`}</code> (login) || send msg{" "}
                <code>{`{type:...,info...}`}</code> đến 'aspUpdate' (register){" "}
              </li>
              <li>
                expressChat: Sử lí các chức năng của app|| call
                redis(read||write) data, elastic(only read), send msg{" "}
                <code>{`{type:...,info...}`}</code> đến 'aspUpdate' (save
                infoChat)
              </li>
              <li>
                aspUpdate: Sự lí data theo event| Nhận msg từ sercice khác rồi
                hanele: save data vào mongo(only write), sync data from mongo to
                elastic, save data(img) google.
              </li>
              <li>aspAPI: Quản lí api từ các service.</li>
            </ul>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
