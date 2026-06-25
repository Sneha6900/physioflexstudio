import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/lib/client-auth-store";
import { Mail, Phone, Chrome, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login/user/signup")({
  component: ClientSignupPage,
  meta: () => [
    {
      title: "Sign Up — PhysioFlex Studio",
      description: "Create your PhysioFlex Studio account",
    },
  ],
});

function ClientSignupPage() {
  const navigate = useNavigate();
  const { setSignUpMethod } = useClientAuth();
  const [method, setMethod] = useState<"email" | "phone" | "google" | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleMethodSelect = (selectedMethod: "email" | "phone" | "google") => {
    if (selectedMethod === "google") {
      // Mock Google auth - in production, use OAuth
      setSignUpMethod("google");
      navigate({ to: "/login/user/profile" });
    } else {
      setMethod(selectedMethod);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!input.trim()) {
      setError(method === "email" ? "Email is required" : "Phone is required");
      return;
    }

    if (method === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        setError("Please enter a valid email");
        return;
      }
    } else if (method === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(input.replace(/\D/g, ""))) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
    }

    setSignUpMethod(method);
    navigate({ to: "/login/user/profile" });
  };

  return (
    <PageShell
      crumbs={navCrumbs.loginSignup()}
      showFooter={false}
      contentClassName="flex min-h-[calc(100dvh-var(--site-nav-height)-var(--site-nav-gap)-2.5rem)] items-center"
    >
      <div className="w-full max-w-md mx-auto">
        {method ? (
          <div>
            <button
              onClick={() => setMethod(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Sign up with {method === "email" ? "Email" : "Phone Number"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {method === "email"
                ? "Enter your email to create an account"
                : "Enter your phone number to create an account"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-2">
                  {method === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <Input
                  type={method === "email" ? "email" : "tel"}
                  placeholder={method === "email" ? "you@example.com" : "+91 98765 43210"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full rounded-lg">
                Continue
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate({ to: "/login" })}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground mb-8">Choose how you'd like to sign up</p>

            <div className="space-y-3">
              <button
                onClick={() => handleMethodSelect("email")}
                className="w-full flex items-center gap-3 rounded-lg border-2 border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md active:scale-95"
              >
                <Mail className="size-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">Sign up with email</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect("phone")}
                className="w-full flex items-center gap-3 rounded-lg border-2 border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md active:scale-95"
              >
                <Phone className="size-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">Sign up with phone number</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect("google")}
                className="w-full flex items-center gap-3 rounded-lg border-2 border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md active:scale-95"
              >
                <Chrome className="size-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Google</p>
                  <p className="text-sm text-muted-foreground">Sign up with Google</p>
                </div>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate({ to: "/login" })}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
