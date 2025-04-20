import React, { lazy, Suspense } from "react";
import "./globals.css";
import ReduxProvider from "@store/reduxProvider";

const LazyModalRouter = lazy(() => import("@components/ModalRouter"));

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-urbanist min-h-screen">
        <ReduxProvider>{children}</ReduxProvider>
        <Suspense fallback={null}>
          <LazyModalRouter />
        </Suspense>
      </body>
    </html>
  );
}
