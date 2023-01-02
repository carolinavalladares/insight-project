import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className="px-4 lg:p-0">{children}</div>
    </>
  );
}
