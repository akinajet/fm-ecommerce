import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

// Components
import Header from "../components/layout/Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className=" min-h-screen text-[#121212] dark:text-[#F0F0F0] transition-colors p-5">
      <Header />
      <main className="max-w-7xl mx-auto mt-5">
        {children}
      </main>
    </div>
  )
}