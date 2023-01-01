import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className="lg:px-4">{children}</div>
    </>
  );
}
