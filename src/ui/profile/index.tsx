"use client";
import ProfileView from "./view";
import useProfileModel from "./viewModel";

export default function Profile() {
  const { admin, router, loading } = useProfileModel();
  return <ProfileView loading={loading} router={router} admin={admin} />;
}
