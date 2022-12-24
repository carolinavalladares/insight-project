import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { checkUserLoggedIn } from "../utils/checkUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Item from "../components/Note";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //   check if logged in and redirect accordingly
  useEffect(() => {
    checkUserLoggedIn(user, loading, route);
  }, [user, loading]);

  return (
    <div className="max-w-screen-lg m-auto px-4 mt-6">
      <h2 className="text-lg mb-5 font-semibold font-poppins">My insights</h2>

      <div>
        <Item />
      </div>
    </div>
  );
}
