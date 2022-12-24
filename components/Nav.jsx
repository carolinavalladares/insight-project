import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, loading] = useAuthState(auth);

  return (
    <nav className=" p-4 font-poppins bg-white drop-shadow-sm">
      <div className="max-w-screen-lg flex items-center justify-between m-auto">
        <Link href={"/"}>
          <h1 className="text-lg">Insight</h1>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <button
              title="add to-do"
              className="bg-teal-700 text-white p-2 rounded-full"
            >
              <AiOutlinePlus />
            </button>
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link href={"/dashboard"}></Link>
              <Image
                className="rounded-full relative cursor-pointer"
                width={40}
                height={40}
                src={user.photoURL}
                alt=""
              />

              <div
                className={`shadow-lg py-4 absolute right-4 rounded-lg bg-white top-20 before:h-6 before:bg-transparent before:w-full before:absolute before:-top-6 before:right-0 ${
                  !showDropdown ? "hidden" : ""
                }`}
              >
                <h4 className="text-sm border-b border-b-slate-300 px-4 pb-1">
                  {user.displayName}
                </h4>
                <ul className="px-4 pt-2">
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
