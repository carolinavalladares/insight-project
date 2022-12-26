import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function NewNote() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const [note, setNote] = useState({ title: "", text: "" });

  const restrictPage = () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
  };

  useEffect(() => {
    restrictPage();
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.text) {
      console.log("note cannot be empty...");
      return;
    }

    const newNote = {
      ...note,
      avatar: user.photoURL,
      username: user.displayName,
      userId: user.uid,
      time: serverTimestamp(),
    };

    const collectionRef = collection(db, "notes");

    await addDoc(collectionRef, newNote);

    setNote({ title: "", text: "" });

    route.push("/dashboard");
  };

  return (
    <div className="m-auto max-w-screen-lg px-4 mt-9 font-poppins">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-4 bg-white shadow-lg rounded-lg"
      >
        <h3 className="mb-3 font-semibold ">Add new insight</h3>
        <input
          className="mb-4 border h-11 px-3 rounded-lg text-sm focus:border-teal-600 outline-none"
          type="text"
          name="title"
          placeholder="Title..."
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          className="mb-4 border h-48 p-3 rounded-md text-sm focus:border-teal-600 outline-none "
          name="note"
          id="note"
          placeholder="What is your insight?"
          value={note.text}
          onChange={(e) => setNote({ ...note, text: e.target.value })}
        ></textarea>

        <button className=" h-11 rounded-md text-white bg-teal-700 focus:bg-teal-600 outline-none hover:bg-teal-600">
          Post
        </button>
      </form>
    </div>
  );
}
