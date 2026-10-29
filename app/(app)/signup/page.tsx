/** @format */

import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";
import RedirectIfLoggedIn from "@/components/auth/RedirectIfLoggedIn";

function SignupPage() {
  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <Suspense fallback={null}>
        <RedirectIfLoggedIn />
      </Suspense>

      <h1 className="text-3xl mb-2">SIGN UP</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        CREATE YOUR CANDIDATE ACCOUNT
      </p>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
