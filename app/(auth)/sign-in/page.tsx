"use client";

import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import SignInForm from "../(components)/sign-in-form";

export default function SignInPage() {
  const { loading } = useAuthRedirect({ requireAuth: false });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <SignInForm />;
}
