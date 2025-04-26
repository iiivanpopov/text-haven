import { type ReactNode } from "react";
import "./globals.css";
import StoreProvider from "@shared/ui/providers/store-provider";
import Header from "@widgets/header";
import Footer from "@widgets/footer";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-urbanist">
        <div className="max-w-screen-xl mx-auto grid grid-rows-[10vh_80vh]">
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
