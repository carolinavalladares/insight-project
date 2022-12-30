import Post from "../components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineSend } from "react-icons/ai";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { comment } from "postcss";
import Link from "next/link";

export default function postDetails() {
  const route = useRouter();
  const post = route.query;
  const [user, loading] = useAuthState(auth);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment) {
      return;
    }

    const docRef = doc(db, "posts", post.id);

    try {
      await updateDoc(docRef, {
        comments: arrayUnion({
          text: newComment,
          createdAt: new Date(),
          username: user.displayName,
          avatar: user.photoURL,
          userId: user.uid,
        }),
      });

      setNewComment("");
      console.log("comment added!");
    } catch (e) {
      console.log(e);
    }
  };

  const getComments = () => {
    const docRef = doc(db, "posts", post.id);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    getComments();
  }, [user, loading]);

  return (
    <div className="m-auto max-w-screen-lg mt-4 font-poppins">
      <Post {...post}></Post>

      <form
        onSubmit={(e) => handleAddComment(e)}
        className="flex items-center bg-white shadow-lg p-4 rounded-lg"
      >
        <input
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 h-10 px-4 rounded-lg border mr-2 text-sm outline-none focus:border-teal-600"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
        />
        <button
          className="h-10 rounded-lg bg-teal-600 text-white w-14 flex items-center justify-center"
          type="submit"
        >
          <AiOutlineSend className="text-lg" />
        </button>
      </form>

      <div>
        <h2 className="my-3">Comments</h2>
        <div>
          {comments &&
            comments.map((comment, index) => {
              return <Post key={index} {...comment}></Post>;
            })}
        </div>
      </div>
    </div>
  );
}
