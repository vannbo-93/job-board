/** @format */

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RedirectIfLoggedIn from "@/components/auth/RedirectIfLoggedIn";

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <Suspense fallback={null}>
        <RedirectIfLoggedIn />
      </Suspense>

      <h1 className="text-3xl mb-2">LOGIN</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        LOGIN TO YOUR ACCOUNT
      </p>

      <Suspense fallback={null}>
        <RegisteredNotice searchParams={props.searchParams} />
      </Suspense>

      <Suspense fallback={<div className="mt-8 brutal-border h-80" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

async function RegisteredNotice({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { registered } = await searchParams;
  if (registered !== "1") return null;

  return (
    <p className="mb-6 brutal-border bg-accent/10 p-4 font-mono text-sm">
      ACCOUNT CREATED. PLEASE LOG IN.
    </p>
  );
}
