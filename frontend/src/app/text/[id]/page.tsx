import Text from "@features/text/ui/text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TextHaven | Text",
  description: "Page with text",
};

export default function TextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Text params={params} />;
}
