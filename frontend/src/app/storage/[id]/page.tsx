import Directory from "@features/storage/ui/directory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storage | TextHaven",
  description: "Your storage of TextHaven",
};

export default function Storage() {
  return <Directory />;
}
