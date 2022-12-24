import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between max-w-screen-lg m-auto mt-5 px-4 font-poppins">
      <Link href={"/"}>
        <h1 className="text-lg">My To-Do's</h1>
      </Link>

      <Link href={"/auth/login"}>
        <button className="bg-teal-700 text-white h-8 w-20 rounded-lg text-sm">
          Join
        </button>
      </Link>
    </nav>
  );
}
