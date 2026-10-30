/** @format */

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { getMyProfile } from "@/services/user-profiles/user-profiles.service";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl mb-2">MY PROFILE</h1>
      <Suspense fallback={<p className="font-mono text-sm">LOADING...</p>}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}

async function ProfileContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/profile");

  const profile = await getMyProfile();

  return (
    <>
      <div className="mb-8 font-mono text-sm text-muted-foreground">
        <p>{user.name.toUpperCase()}</p>
        <p>{user.email}</p>
      </div>
      <ProfileForm defaultLinkedin={profile?.linkedin ?? ""} />
    </>
  );
}
