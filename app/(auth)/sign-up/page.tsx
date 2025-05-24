"use client";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import SignUpForm from "../(components)/sign-up-form";

export default function SignUpPage() {
  const { loading } = useAuthRedirect({ requireAuth: false });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <SignUpForm />;
}
