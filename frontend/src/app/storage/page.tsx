import Storage from "./[id]/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TextHaven | Root",
  description: "Storage of your texts",
};

export default function StorageRoot() {
  return (
    <Storage params={new Promise((resolve) => resolve({ id: undefined }))} />
  );
}
