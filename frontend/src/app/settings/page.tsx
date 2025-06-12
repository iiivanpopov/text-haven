import type { Metadata } from "next";
import { SettingsEditForm } from "@features/settings/ui/settings-edit-form";

export const metadata: Metadata = {
  title: "Settings | TextHaven",
  description: "Settings page of TextHaven",
};

export default function SettingsPage() {
  return <SettingsEditForm />;
}
