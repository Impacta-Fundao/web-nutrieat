"use client";

import SettingsView from "./view";
import useSettingsModel from "./viewModel";

export default function SettingsPage() {
  const model = useSettingsModel();
  return <SettingsView {...model} />;
}
