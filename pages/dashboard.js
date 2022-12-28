import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { checkUserLoggedIn } from "../utils/checkUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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

  const getPosts = () => {
    // const col = await getDocs(collection(db, "posts"));
    // const postsArr = [];

    // col.forEach((doc) => {
    //   const post = { ...doc.data(), id: doc.id };

    //   postsArr.push(post);
    //   console.log(post);
    // });

    // setPosts(postsArr);

    if (loading) return;
    if (!user) return route.push("/auth/login");

    const collectionRef = collection(db, "posts");

    console.log(collectionRef);

    const q = query(collectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    console.log(posts);

    return unsubscribe;
  };

  const handleDelete = (post) => {
    const docRef = doc(db, "posts", post.id);

    deleteDoc(docRef);
  };

  useEffect(() => {
    getPosts();

    console.log(posts);
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
                      <AiFillEdit />
                      Edit
                    </button>
                  </Link>

                  <button
                    title="delete"
                    className="flex items-center gap-1 text-rose-700"
                    onClick={() => handleDelete(post)}
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
