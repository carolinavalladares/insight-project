import "../styles/globals.css";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer autoClose={1500} limit={1} position={"bottom-center"} />
    </>
  );
}
