import React from "react";
import TopBar from "../Layout/TopBar";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <TopBar />
      {/* Nav  Bar */}
      <NavBar />
      {/* Cart Drawer */}
    </header>
  );
}
