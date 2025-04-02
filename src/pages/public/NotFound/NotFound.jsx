import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="font-extrabold tracking-widest text-gray-900 text-9xl">
        404
      </h1>
      <div className="absolute px-2 text-sm text-white bg-orange-500 rounded rotate-12">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-white active:text-orange-500 group focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
          <span className="relative block px-8 py-3 border border-current">
            <span>Về trang chủ</span>
          </span>
        </Link>
      </button>
    </main>
  );
}
