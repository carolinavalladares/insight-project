import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, loading] = useAuthState(auth);

  return (
    <nav className=" p-4 font-poppins bg-white drop-shadow-sm">
      <div className="max-w-screen-lg flex items-center justify-between m-auto relative">
        <Link href={"/"}>
          <h1 className="text-lg">Insight</h1>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <Link href={"/new-post"}>
              <button
                title="add to-do"
                className="bg-teal-700 text-white p-2 rounded-full focus:bg-teal-600 hover:bg-teal-600"
              >
                <AiOutlinePlus />
              </button>
            </Link>

            <div
              onMouseEnter={
                window.innerWidth > 992 ? () => setShowDropdown(true) : null
              }
              onMouseLeave={
                window.innerWidth > 992 ? () => setShowDropdown(false) : null
              }
              onClick={
                window.innerWidth <= 992
                  ? () => setShowDropdown(!showDropdown)
                  : null
              }
            >
              {window.innerWidth > 992 ? (
                <Link href={"/dashboard"}>
                  <img
                    className="rounded-full cursor-pointer w-10 h-10"
                    src={user.photoURL}
                    alt=""
                  />
                </Link>
              ) : (
                <Image
                  className="rounded-full cursor-pointer"
                  width={40}
                  height={40}
                  src={user.photoURL}
                  alt=""
                />
              )}

              <div
                className={`shadow-lg py-4 absolute right-2 rounded-lg bg-white top-16 before:h-6 before:bg-transparent before:w-full before:absolute before:-top-6 before:right-0 ${
                  !showDropdown ? "hidden" : ""
                }`}
              >
                <h4 className="text-sm border-b border-b-slate-300 px-4 pb-1">
                  {user.displayName}
                </h4>
                <ul className="px-4 pt-2">
                  {window.innerWidth <= 992 ? (
                    <li className="mb-1">
                      <Link className="text-sm" href={"/dashboard"}>
                        <button>Dashboard</button>
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <button className="text-sm" onClick={() => auth.signOut()}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <Link href={"/auth/login"}>
            <button className="bg-teal-700 text-white h-8 w-20 rounded-lg text-sm">
              Join
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
