import type { Metadata } from "next";
import Text from "@features/text/ui/text";

export const metadata: Metadata = {
  title: "TextHaven | Text",
  description: "Page with text",
};

export default function TextPage() {
  return <Text />;
}
