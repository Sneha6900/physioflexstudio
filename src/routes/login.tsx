import { createFileRoute, useNavigate, Outlet, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { Activity, Users, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginLayout,
  head: () => ({
    meta: [
      { title: "Login — PhysioFlex Studio" },
      {
        name: "description",
        content: "Sign in to PhysioFlex Studio as a client or physiotherapist.",
      },
    ],
  }),
});

function LoginLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the role selection on the /login route itself
  const isRoleSelectionPage = location.pathname === "/login";

  if (!isRoleSelectionPage) {
    // If we're on a child route, just render the outlet
    return <Outlet />;
  }

  return (
    <PageShell
      crumbs={navCrumbs.login()}
      showFooter={false}
      contentClassName="flex min-h-[calc(100dvh-var(--site-nav-height)-var(--site-nav-gap)-2.5rem)] items-center"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="size-6 text-accent" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            PhysioFlex <span className="text-accent">Studio</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Choose how you'd like to access PhysioFlex Studio
          </p>
        </div>

        <div className="space-y-4">
          {/* Client Login Option */}
          <button
            onClick={() => navigate({ to: "/login/user/signup" })}
            className="w-full rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/15 p-3">
                <Users className="size-6 text-primary" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-foreground">Client</h2>
                <p className="text-sm text-muted-foreground">Book sessions and track recovery</p>
              </div>
            </div>
          </button>

          {/* Physiotherapist Login Option */}
          <button
            onClick={() => navigate({ to: "/physio/login" })}
            className="w-full rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-success/15 p-3">
                <Stethoscope className="size-6 text-success" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-foreground">Physiotherapist</h2>
                <p className="text-sm text-muted-foreground">Manage clients and sessions</p>
              </div>
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need help?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </PageShell>
  );
}
