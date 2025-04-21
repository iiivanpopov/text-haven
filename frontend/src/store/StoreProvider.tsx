"use client";

import { Provider } from "react-redux";
import { AppStore, setupStore } from "./store";
import React, { ReactNode, useRef } from "react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
