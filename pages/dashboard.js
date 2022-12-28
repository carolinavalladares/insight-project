import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { checkUserLoggedIn } from "../utils/checkUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { collection, getDocs } from "firebase/firestore";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  //   check if logged in and redirect accordingly
  useEffect(() => {
    checkUserLoggedIn(user, loading, route);
  }, [user, loading]);

  const getPosts = async () => {
    const col = await getDocs(collection(db, "posts"));
    const postsArr = [];

    col.forEach((doc) => {
      const post = { ...doc.data(), id: doc.id };

      postsArr.push(post);
      console.log(post);
    });

    setPosts(postsArr);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    getPosts();
  }, [user, loading]);

  return (
    <div className="max-w-screen-lg m-auto px-4 mt-6">
      <h2 className="text-lg mb-5 font-semibold font-poppins">My insights</h2>

      {posts.length > 0 && (
        <div className="">
          {posts.map((post, index) => {
            return (
              <Post key={index} {...post}>
                <div className="mt-2 text-sm flex items-center gap-2">
                  <Link href={{ pathname: "/new-post", query: { ...post } }}>
                    <button
                      title="edit"
                      className="flex items-center gap-1 text-teal-600"
                    >
                      Edit
                    </button>
                  </Link>
                  <AiFillEdit />

                  <button
                    title="delete"
                    className="flex items-center gap-1 text-rose-700"
                  >
                    <AiFillDelete />
                    Delete
                  </button>
                </div>
              </Post>
            );
          })}
        </div>
      )}

      {posts.length === 0 && <div>No posts yet...</div>}
    </div>
  );
}
