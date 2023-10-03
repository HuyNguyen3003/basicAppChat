const RightOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">
        Bạn chưa có tài khoảng ?
      </h1>

      <h5 className="text-xl text-white">Tạo tài khoảng với 1 cú nhấp chuột</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={(e) => {
            setIsAnimated(!isAnimated);
          }}
        >
          Đăng kí
        </button>
      </div>
    </div>
  );
};

export default RightOverlayContent;
