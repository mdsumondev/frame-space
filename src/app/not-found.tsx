import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <h1 className="text-9xl text-center font-bold text-[#1F2D22]"> 404 </h1>
        <h3 className="text-xl text-center my-3 font-semibold">
          Not Found The Page !
        </h3>
        <Link
          href="/"
          className="btn btn-sm rounded-full border-none bg-[#1F2D22] text-white hover:bg-[#354739] text-center block mx-auto flex items-center text-base"
        >
          Back to the Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
