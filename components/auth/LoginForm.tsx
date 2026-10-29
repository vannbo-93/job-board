/** @format */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Only allow same-site paths like "/dashboard", never "https://..." or "//evil.com"
function safeCallbackUrl(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));

  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password");
        setIsPending(false);
        return;
      }

      // Full page load so every page sees the new session cookie
      window.location.assign(callbackUrl);
    } catch (err) {
      console.error("signIn failed:", err);
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 brutal-border p-6 space-y-6">
      <Input
        label="EMAIL"
        name="email"
        type="email"
        placeholder="e.g. jane@example.com"
        autoComplete="email"
        required
      />
      <Input
        label="PASSWORD"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
      />

      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={isPending}>
        {isPending ? "LOGGING IN..." : "LOGIN"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent hover:underline">
          SIGN UP
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
