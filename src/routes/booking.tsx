import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, CalendarCheck, Check, Clock, MapPin, Star, User } from "lucide-react";
import { toDataURL } from "qrcode";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { setAssessment, useAssessment } from "@/lib/assessment-store";
import {
  getSpecialist,
  nextDays,
  recommendSpecialistForAssessment,
  studioLocations,
  specialists,
  timeSlots,
} from "@/lib/specialists";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Session — PhysioFlex Studio" },
      {
        name: "description",
        content: "Select your Bangalore studio, specialist, date and time slot to confirm your recovery session.",
      },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const data = useAssessment();
  const navigate = useNavigate();
  const days = nextDays(6);

  const recommendation = recommendSpecialistForAssessment(data.area, data.markers, data.profile.age);
  const selectedSpecialist = getSpecialist(data.specialistId ?? recommendation.id) ?? recommendation;

  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [selectedId, setSelectedId] = useState<string>(selectedSpecialist.id);
  const [studio, setStudio] = useState(studioLocations[0]);
  const [date, setDate] = useState(days[0].iso);
  const [time, setTime] = useState(timeSlots[1]);
  const [ticket, setTicket] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const specialist = getSpecialist(selectedId);
  const dateLabel = days.find((d) => d.iso === date);

  useEffect(() => {
    setSelectedId(selectedSpecialist.id);
  }, [selectedSpecialist.id]);

  useEffect(() => {
    if (confirmed) {
      const payload = `PhysioFlex Session | ${specialist?.name ?? "Assigned therapist"} | ${studio} | ${date} ${time}`;
      toDataURL(payload)
        .then((dataUrl) => setTicket(dataUrl))
        .catch(() => setTicket(null));
    }
  }, [confirmed, date, time, specialist, studio]);

  if (confirmed) {
    const bookingId = data.booking?.bookingId ?? `${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    return (
      <FlowShell step={4}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-xl rounded-[2rem] border border-accent/40 bg-accent/[0.07] p-10 text-center"
        >
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-charcoal">
            <Check className="size-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Session booked</h1>
          <p className="mt-2 text-muted-foreground">
            Your premium PhysioFlex check-in ticket is ready. Bring this QR code to the studio.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border bg-card p-6 text-left text-sm">
              <Row icon={User} k="Specialist" v={specialist?.name ?? "Assigned therapist"} />
              <Row icon={MapPin} k="Location" v={studio} />
              <Row icon={CalendarCheck} k="Date" v={`${dateLabel?.dow}, ${dateLabel?.label}`} />
              <Row icon={Clock} k="Time" v={time} />
              <Row icon={Star} k="Booking ID" v={bookingId} />
            </div>
            <div className="rounded-[2rem] border border-border bg-gradient-to-br from-accent/10 via-background to-muted p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Check-in QR code</p>
              {ticket ? (
                <img src={ticket} alt="Session QR code" className="mx-auto mt-5 h-56 w-56 rounded-3xl border border-border bg-white p-4" />
              ) : (
                <div className="mt-5 grid h-56 place-items-center rounded-3xl border border-dashed border-border bg-muted/50 text-sm text-muted-foreground">
                  QR code loading...
                </div>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Scan this QR code at the PhysioFlex center to check in for your session.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="hero" className="rounded-full" asChild>
              <Link to="/dashboard">Go to Progress Dashboard</Link>
            </Button>
            <Button variant="heroOutline" className="rounded-full" asChild>
              <Link to="/specialists">Book another</Link>
            </Button>
          </div>
        </motion.div>
      </FlowShell>
    );
  }

  return (
    <FlowShell step={4}>
      <Link
        to="/specialists"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to specialists
      </Link>

      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Book your session
      </h1>
      <p className="mt-3 max-w-xl text-lg text-muted-foreground">
        Pick your Bangalore studio, date and time. Free reschedule up to 24 hours before.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Therapist assignment</p>
                <p className="mt-1 text-sm text-muted-foreground">Choose your preferred PhysioFlex expert or let us assign the best fit.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => setMode("auto")}
                className={cn(
                  "rounded-3xl border px-4 py-4 text-left transition",
                  mode === "auto"
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">Auto assign best-fit physiotherapist</p>
                    <p className="mt-1 text-sm text-muted-foreground">Recommended based on your pain areas and mobility profile.</p>
                  </div>
                  <span className="text-xs uppercase text-muted-foreground">Recommended</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setMode("manual")}
                className={cn(
                  "rounded-3xl border px-4 py-4 text-left transition",
                  mode === "manual"
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50",
                )}
              >
                <div>
                  <p className="font-semibold text-foreground">Choose specialist manually</p>
                  <p className="mt-1 text-sm text-muted-foreground">Pick your expert from the PhysioFlex team.</p>
                </div>
              </button>
            </div>
          </div>

          {(mode === "auto" || !specialist) && (
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">Auto-assigned therapist</p>
              <div className="mt-5 flex items-center gap-4 rounded-3xl border border-accent/40 bg-accent/10 p-4">
                <img src={recommendation.img} alt={recommendation.name} className="size-14 rounded-2xl object-cover" />
                <div>
                  <p className="font-semibold text-foreground">{recommendation.name}</p>
                  <p className="text-sm text-muted-foreground">{recommendation.spec}</p>
                  <p className="text-xs text-muted-foreground">{recommendation.available} · {recommendation.studios.join(" & ")}</p>
                </div>
              </div>
            </div>
          )}

          {mode === "manual" && (
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">Select your therapist</p>
              <div className="mt-4 grid gap-3">
                {[...new Set([recommendation, ...specialists])].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-3xl border px-4 py-4 text-left transition",
                      item.id === selectedId
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <img src={item.img} alt={item.name} className="size-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.spec}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Block icon={MapPin} title="Bangalore studio location">
            <div className="flex flex-wrap gap-2">
              {studioLocations.map((s) => (
                <Pill key={s} active={studio === s} onClick={() => setStudio(s)}>
                  {s}
                </Pill>
              ))}
            </div>
          </Block>

          <Block icon={CalendarCheck} title="Select a date">
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  key={d.iso}
                  onClick={() => setDate(d.iso)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-center transition-all",
                    date === d.iso
                      ? "border-accent bg-accent text-charcoal"
                      : "border-border bg-muted/50 text-muted-foreground hover:border-accent/50",
                  )}
                >
                  <div className="text-xs opacity-70">{d.dow}</div>
                  <div className="font-display font-bold">{d.label}</div>
                </button>
              ))}
            </div>
          </Block>

          <Block icon={Clock} title="Time slot">
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t) => (
                <Pill key={t} active={time === t} onClick={() => setTime(t)}>
                  {t}
                </Pill>
              ))}
            </div>
          </Block>
        </div>

        {/* summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] border border-border bg-card p-7">
            <h2 className="font-display text-xl font-bold text-foreground">Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <Row icon={User} k="Specialist" v={specialist?.name ?? "Any available"} />
              <Row icon={MapPin} k="Studio" v={studio} />
              <Row icon={CalendarCheck} k="Date" v={`${dateLabel?.dow}, ${dateLabel?.label}`} />
              <Row icon={Clock} k="Time" v={time} />
            </div>
            <Button
              variant="hero"
              className="mt-7 w-full rounded-full"
              onClick={() => {
                const bookingId = `${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
                setAssessment({
                  booking: { studio, date, time, bookingId },
                  specialistId: selectedId,
                  journey: "expert",
                  completed: true,
                });
                setConfirmed(true);
              }}
            >
              Confirm Booking
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No payment required now — pay at the studio.
            </p>
          </div>
        </div>
      </div>
    </FlowShell>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        <Icon className="size-5 text-accent" /> {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-accent bg-accent text-charcoal"
          : "border-border bg-muted/50 text-muted-foreground hover:border-accent/50",
      )}
    >
      {children}
    </button>
  );
}

function Row({
  icon: Icon,
  k,
  v,
}: {
  icon: typeof User;
  k: string;
  v: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
        <Icon className="size-4" />
      </span>
      <span className="text-muted-foreground">{k}</span>
      <span className="ml-auto font-semibold text-foreground">{v}</span>
    </div>
  );
}