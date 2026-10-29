/** @format */

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleSignup, type SignupState } from "@/app/actions/auth/auth.action";

function SignupForm() {
  const [state, formAction, isPending] = useActionState<SignupState, FormData>(
    handleSignup,
    undefined,
  );

  const v = state?.values;
  const e = state?.errors;

  return (
    <form
      key={JSON.stringify(v ?? {})}
      action={formAction}
      className="mt-8 brutal-border p-6 space-y-6">
      <Input
        label="FULL NAME"
        name="name"
        placeholder="e.g. JANE DOE"
        autoComplete="name"
        required
        defaultValue={v?.name}
        error={e?.name?.[0]}
      />

      <Input
        label="EMAIL"
        name="email"
        type="email"
        placeholder="e.g. jane@example.com"
        autoComplete="email"
        required
        defaultValue={v?.email}
        error={e?.email?.[0]}
      />

      <Input
        label="PASSWORD"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        required
        minLength={8}
        error={e?.password?.[0]}
      />

      <Input
        label="CONFIRM PASSWORD"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        required
        error={e?.confirmPassword?.[0]}
      />

      {e?.form && (
        <p className="font-mono text-sm text-destructive">{e.form[0]}</p>
      )}

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={isPending}>
        {isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          LOGIN
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
