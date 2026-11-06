import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Navbar from "../navbar";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}