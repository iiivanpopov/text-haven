import type { Metadata } from "next";
import Directory from "@features/storage/ui/directory";

export const metadata: Metadata = {
  title: "Storage | TextHaven",
  description: "Your storage of TextHaven",
};

export default function StoragePage() {
  return <Directory />;
}
