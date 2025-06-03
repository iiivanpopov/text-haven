"use client";

import { type ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { setIsLoaded, setSettings } from "@entities/settings/model/slice";
import { parseSettings } from "@shared/lib/local-storage";
import { store } from "@shared/store";

export default function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const settings = parseSettings();
    if (settings) {
      store.dispatch(setSettings(settings));
      store.dispatch(setIsLoaded(true));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
