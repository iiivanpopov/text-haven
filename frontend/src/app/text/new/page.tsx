import type { Metadata } from "next";
import NewFileForm from "@features/storage/ui/create-new-form";

export const metadata: Metadata = {
  title: "Create | TextHaven",
  description: "Create new file",
};

export default function TextNew() {
  return <NewFileForm />;
}
