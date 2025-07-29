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
    <div>
      <Header />
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  )
}