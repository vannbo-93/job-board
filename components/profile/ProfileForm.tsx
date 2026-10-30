/** @format */

"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  handleUpdateProfile,
  type ProfileState,
} from "@/app/actions/profile/profile.action";

function ProfileForm({ defaultLinkedin }: { defaultLinkedin: string }) {
  const [state, formAction, isPending] = useActionState<ProfileState, FormData>(
    handleUpdateProfile,
    undefined,
  );

  const e = state?.errors;

  return (
    <form
      key={state?.values?.linkedin ?? defaultLinkedin}
      action={formAction}
      className="brutal-border p-6 space-y-6">
      <h2 className="text-xl border-b-3 border-foreground pb-4">
        PROFILE DETAILS
      </h2>

      <Input
        name="linkedin"
        type="url"
        label="LINKEDIN"
        placeholder="https://linkedin.com/in/..."
        defaultValue={state?.values?.linkedin ?? defaultLinkedin}
        error={e?.linkedin?.[0]}
      />

      <div>
        <p className="font-heading text-xs font-bold uppercase mb-2">RESUME</p>
        <div className="brutal-border border-dashed p-6 text-center opacity-60">
          <p className="font-mono text-sm font-bold">COMING SOON</p>
        </div>
      </div>

      {(e?.auth || e?.form) && (
        <p className="font-mono text-sm text-destructive">
          {e.auth?.[0] ?? e.form?.[0]}
        </p>
      )}
      {state?.success && (
        <p className="font-mono text-sm text-accent">PROFILE SAVED ✓</p>
      )}

      <Button type="submit" variant="accent" disabled={isPending}>
        {isPending ? "SAVING..." : "SAVE PROFILE"}
      </Button>
    </form>
  );
}

export default ProfileForm;
