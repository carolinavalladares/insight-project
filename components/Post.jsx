export default function Post({ avatar, username, text, children }) {
  return (
    <div className="shadow-lg bg-white p-5 rounded-lg font-poppins mb-4">
      <div className="flex items-center mb-2">
        <img className="rounded-full block w-10 mr-2" src={avatar} alt="" />
        <p className="text-sm">{username}</p>
      </div>
      <p className="text-base">{text}</p>

      <div className="mt-2">{children}</div>
    </div>
  );
}
