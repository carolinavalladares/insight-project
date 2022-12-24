import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function LoginPage() {
  const [user, loading] = useAuthState(auth);

  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLoggedIn = () => {
    if (loading) {
      return;
    }
    if (user) {
      return route.push("/");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [user, loading]);

  return (
    <div className="max-w-screen-sm m-auto px-4 mt-20">
      <h2 className="text-lg mb-3">Join the app!</h2>

      <div>
        <p className="mb-4">Login with one of the providers:</p>

        <div>
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-2 bg-slate-800 text-white w-full h-11 px-3 rounded-lg"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
