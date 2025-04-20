import Footer from "@components/Footer";
import Header from "@components/Header";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "TextHaven | Storage",
  description: "Storage of your texts",
};

export default function StorageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-[1270px] m-[0_auto] grid grid-rows-[10vh_minmax(80vh,auto)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
