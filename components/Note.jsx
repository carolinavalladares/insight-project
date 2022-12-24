export default function Item({ children }) {
  return (
    <div className="shadow-lg bg-white p-5 rounded-lg font-poppins">
      <h3 className="mb-2 font-semibold text-base">Title</h3>
      <p className="text-sm line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div>{children}</div>
    </div>
  );
}
