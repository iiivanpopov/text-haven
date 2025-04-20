import Footer from "@components/Footer";
import Header from "@components/Header";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | TextHaven",
  description: "Manage and edit your account here",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1270px] m-[0_auto] grid grid-rows-[10vh_minmax(80vh,auto)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
