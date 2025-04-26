import type { Metadata } from "next";
import Directory from "@features/storage/ui/directory";

export const metadata: Metadata = {
  title: "TextHaven | Root",
  description: "Storage of your texts",
};

export default function Storage() {
  return <Directory />;
}
