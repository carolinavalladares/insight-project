import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

export default function NewNote() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [note, setNote] = useState({ text: "" });

  const routerData = route.query;

  const checkData = () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    if (routerData) {
      setNote(routerData);
    }
  };

  useEffect(() => {
    checkData();
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.text) {
      console.log("note cannot be empty...");
      return;
    }

    if (note.text.length > 300) {
      console.log("Note must be 300 characters or shorter...");
      return;
    }

    if (note.hasOwnProperty("id")) {
      // update post

      const docRef = doc(db, "posts", note.id);
      const updatedPost = {
        ...note,
        createdAt: new Date(),
      };
      await updateDoc(docRef, updatedPost);

      console.log("updated post...");
    } else {
      // create new post

      const newNote = {
        ...note,
        avatar: user.photoURL,
        username: user.displayName,
        userId: user.uid,
        createdAt: new Date(),
        comments: [],
      };

      const collectionRef = collection(db, "posts");
      try {
        await addDoc(collectionRef, newNote);
      } catch (e) {
        console.log(e);
      }

      setNote({ text: "" });
    }
    route.push("/dashboard");
  };

  return (
    <div className="m-auto max-w-screen-lg px-4 mt-9 font-poppins">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-4 bg-white shadow-lg rounded-lg"
      >
        {note.id ? (
          <h3 className="mb-3 font-semibold ">Edit insight</h3>
        ) : (
          <h3 className="mb-3 font-semibold ">Add new insight</h3>
        )}

        <textarea
          className=" border h-48 p-3 rounded-md text-sm focus:border-teal-600 outline-none "
          name="note"
          id="note"
          placeholder="What is your insight?"
          value={note.text}
          onChange={(e) => setNote({ ...note, text: e.target.value })}
        ></textarea>
        <p
          className={`mt-1 ml-2 mb-4 text-sm text-gray-400 font-thin ${
            note.text && note.text.length > 300 ? "text-red-400" : null
          }`}
        >
          {note.text ? note.text.length : 0}/300
        </p>

        <button className=" h-11 rounded-md text-white bg-teal-700 focus:bg-teal-600 outline-none hover:bg-teal-600">
          {note.id ? "Edit" : "Post"}
        </button>
      </form>
    </div>
  );
}
