import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { loginPhysio, physioAccountsList, usePhysio, hydratePhysio } from "@/lib/physio-store";

export const Route = createFileRoute("/physio/login")({
  head: () => ({
    meta: [
      { title: "Physiotherapist Login — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Sign in to the PhysioFlex Studio physiotherapist dashboard to accept sessions, view client assessments, and manage your availability.",
      },
    ],
  }),
  component: PhysioLoginPage,
});

function PhysioLoginPage() {
  const physio = usePhysio();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("arjun@physioflex.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hydratePhysio();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && physio.user) {
      navigate({ to: "/physio/dashboard" });
    }
  }, [hydrated, physio.user, navigate]);

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    const user = loginPhysio(email, password);
    if (!user) {
      setError("Unknown physiotherapist email. Try a demo account.");
      return;
    }
    navigate({ to: "/physio/dashboard" });
  };

  const handleQuickLogin = (accountEmail: string) => {
    const user = loginPhysio(accountEmail, "demo");
    if (user) {
      navigate({ to: "/physio/dashboard" });
    }
  };

  return (
    <PageShell crumbs={navCrumbs.physioLogin()} showFooter={false}>
      <div className="mx-auto flex max-w-6xl flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-border bg-card p-10 shadow-lg shadow-black/5">
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Physiotherapist login
            </span>
            <h1 className="type-page mt-6 text-foreground">
              Manage your sessions, client assessments, and availability in one place.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Access the physio dashboard to accept assigned sessions, preview client pain areas, and hit daily and weekly performance targets.
            </p>
            <div className="mt-10 grid gap-4">
              {physioAccountsList.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleQuickLogin(account.email)}
                  className="rounded-3xl border border-border bg-muted/70 px-5 py-4 text-left transition hover:border-accent/50 hover:bg-accent/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.specializations.join(" • ")}</p>
                    </div>
                    <ArrowRight className="size-5 text-accent" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-border bg-card p-10 shadow-lg shadow-black/5">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <HeartPulse className="size-5 text-accent" /> Physio access
            </div>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Sign in</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Enter your physio email to continue. Use a demo account or sign in to the team workspace.
            </p>

            <div className="mt-8 space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Email
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@physioflex.com"
                  className="mt-2"
                />
              </label>
              <label className="block text-sm font-medium text-foreground">
                Password
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="mt-2"
                />
              </label>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="hero" size="lg" onClick={handleLogin}>
                Sign in
              </Button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Return to client app
              </Link>
            </div>

            <div className="mt-8 rounded-3xl border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Need a quick demo?</p>
              <p className="mt-2">Pick one of the sample physiotherapist profiles above and jump straight into the course of assigned sessions.</p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
