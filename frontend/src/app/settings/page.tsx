import type { Metadata } from "next";
import EditForm from "@features/settings/ui/edit-form";

export const metadata: Metadata = {
  title: "Settings | TextHaven",
  description: "Settings page of TextHaven",
};

export default function SettingsPage() {
  return <EditForm />;
}
