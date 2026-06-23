import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientAssessment } from "@/lib/client-assessment-store";
import { useClientAuth } from "@/lib/client-auth-store";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Zap,
} from "lucide-react";
import QRCode from "qrcode";


export const Route = createFileRoute("/booking")({
  component: ClientBookingPage,
  meta: () => [
    {
      title: "Book Your Session - PhysioFlex",
      description: "Schedule your physiotherapy session",
    },
  ],
});

// Mock physiotherapists data
const PHYSIOTHERAPISTS = [
  {
    id: "physio-1",
    name: "Dr. Priya Sharma",
    specialization: "Sports Injury Specialist",
    experience: "8 years",
    rating: 4.8,
    reviews: 124,
    availability: true,
    image: "👩‍⚕️",
  },
  {
    id: "physio-2",
    name: "Rajesh Kumar",
    specialization: "Orthopedic Physiotherapy",
    experience: "10 years",
    rating: 4.9,
    reviews: 156,
    availability: true,
    image: "👨‍⚕️",
  },
  {
    id: "physio-3",
    name: "Anjali Gupta",
    specialization: "Pain Management",
    experience: "7 years",
    rating: 4.7,
    reviews: 98,
    availability: true,
    image: "👩‍⚕️",
  },
  {
    id: "physio-4",
    name: "Vikram Singh",
    specialization: "Post-Op Rehabilitation",
    experience: "9 years",
    rating: 4.8,
    reviews: 142,
    availability: false,
    image: "👨‍⚕️",
  },
];

const STUDIO_LOCATIONS = [
  {
    id: "studio-1",
    name: "Bangalore Downtown",
    address: "123 MG Road, Bangalore",
    phone: "+91 80 1234 5678",
  },
  {
    id: "studio-2",
    name: "Bangalore Whitefield",
    address: "456 Whitefield Tech Park, Bangalore",
    phone: "+91 80 8765 4321",
  },
  {
    id: "studio-3",
    name: "Bangalore Indiranagar",
    address: "789 Indiranagar Road, Bangalore",
    phone: "+91 80 5555 6666",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const DATES = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return {
    iso: date.toISOString().split("T")[0],
    display: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  };
});

type BookingStep = "mode" | "physio" | "details" | "confirmation";

function ClientBookingPage() {
  const navigate = useNavigate();
  const { assessment } = useClientAssessment();
  const { profile } = useClientAuth();
  const [step, setStep] = useState<BookingStep>("mode");
  const [bookingMode, setBookingMode] = useState<"auto" | "manual">("auto");
  const [selectedPhysio, setSelectedPhysio] = useState<string | null>(null);
  const [selectedStudio, setSelectedStudio] = useState(STUDIO_LOCATIONS[0].id);
  const [selectedDate, setSelectedDate] = useState(DATES[0].iso);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (!assessment) {
      navigate({ to: "/assessment/start" });
    }
  }, []);

  useEffect(() => {
    if (bookingMode === "auto" && !selectedPhysio) {
      const recommended = PHYSIOTHERAPISTS[0];
      setSelectedPhysio(recommended.id);
    }
  }, [bookingMode]);

  useEffect(() => {
    if (bookingId) {
      QRCode.toDataURL(bookingId).then(setQrCode);
    }
  }, [bookingId]);

  if (!assessment || !profile) {
    return null;
  }

  const selectedPhysioData = PHYSIOTHERAPISTS.find(
    (p) => p.id === selectedPhysio
  );
  const selectedStudioData = STUDIO_LOCATIONS.find((s) => s.id === selectedStudio);

  const handleGenerateBooking = () => {
    const id = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setBookingId(id);
    setStep("confirmation");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {step !== "confirmation" && (
          <button
            onClick={() =>
              step === "mode"
                ? navigate({ to: "/assessment/results" })
                : setStep(step === "details" ? "physio" : "mode")
            }
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        )}

        {step === "mode" && (
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Choose Physiotherapist Selection
            </h1>
            <p className="text-muted-foreground mb-8">
              Would you like us to find the best match or choose yourself?
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setBookingMode("auto");
                  setStep("physio");
                }}
                className="w-full rounded-lg border-2 border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg active:scale-95"
              >
                <div className="flex items-start gap-4">
                  <Zap className="size-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      Auto Assign (Recommended)
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      We'll match you with the best physiotherapist based on your pain areas and their expertise
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setBookingMode("manual");
                  setStep("physio");
                }}
                className="w-full rounded-lg border-2 border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg active:scale-95"
              >
                <div className="flex items-start gap-4">
                  <User className="size-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      Choose Physiotherapist
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Browse available physiotherapists and select your preferred one
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "physio" && (
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {bookingMode === "auto"
                ? "Recommended Physiotherapist"
                : "Choose Your Physiotherapist"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {bookingMode === "auto"
                ? "Based on your assessment"
                : "Select from available options"}
            </p>

            <div className="space-y-4 mb-8">
              {PHYSIOTHERAPISTS.filter((p) => p.availability).map((physio) => (
                <button
                  key={physio.id}
                  onClick={() => setSelectedPhysio(physio.id)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    selectedPhysio === physio.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{physio.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {physio.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {physio.specialization}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>⭐ {physio.rating} ({physio.reviews})</span>
                        <span>📅 {physio.experience}</span>
                      </div>
                    </div>
                    {selectedPhysio === physio.id && (
                      <CheckCircle className="size-5 text-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {bookingMode === "auto" && selectedPhysioData && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-8 dark:bg-blue-900/30 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>{selectedPhysioData.name}</strong> is recommended for your pain areas and has excellent reviews for this type of condition.
                </p>
              </div>
            )}

            <Button
              onClick={() => setStep("details")}
              className="w-full rounded-lg"
            >
              Continue
            </Button>
          </div>
        )}

        {step === "details" && (
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Schedule Your Session
            </h1>
            <p className="text-muted-foreground mb-8">
              Select date, time, and location
            </p>

            <div className="rounded-lg bg-card border border-border p-6 space-y-6 mb-8">
              {/* Studio Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Studio Location
                </label>
                <Select value={selectedStudio} onValueChange={setSelectedStudio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STUDIO_LOCATIONS.map((studio) => (
                      <SelectItem key={studio.id} value={studio.id}>
                        {studio.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date
                </label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATES.map((date) => (
                      <SelectItem key={date.iso} value={date.iso}>
                        {date.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time Slot
                </label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-secondary/50 p-4 mb-8 space-y-3">
              <div className="flex gap-2 text-sm">
                <User className="size-4 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-foreground">{selectedPhysioData?.name}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <MapPin className="size-4 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-foreground">{selectedStudioData?.name}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <Calendar className="size-4 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-foreground">
                  {DATES.find((d) => d.iso === selectedDate)?.display}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <Clock className="size-4 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-foreground">{selectedTime}</span>
              </div>
            </div>

            <Button
              onClick={handleGenerateBooking}
              className="w-full rounded-lg"
            >
              Complete Booking
            </Button>
          </div>
        )}

        {step === "confirmation" && bookingId && (
          <div className="text-center">
            <div className="mb-6">
              <CheckCircle className="size-16 text-green-600 mx-auto mb-4" />
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Your appointment has been confirmed. Show the QR code at reception.
              </p>
            </div>

            {/* QR Code */}
            <div className="rounded-lg bg-white p-6 inline-block mb-8">
              <img
                src={qrCode}
                alt="Booking QR Code"
                width={200}
                height={200}
              />
            </div>

            {/* Booking Details */}
            <div className="rounded-lg bg-card border border-border p-6 text-left space-y-4 mb-8">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  BOOKING ID
                </p>
                <p className="font-mono font-bold text-foreground">{bookingId}</p>
              </div>

              <hr className="border-border" />

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  PHYSIOTHERAPIST
                </p>
                <p className="font-medium text-foreground">
                  {selectedPhysioData?.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  DATE & TIME
                </p>
                <p className="font-medium text-foreground">
                  {DATES.find((d) => d.iso === selectedDate)?.display} at{" "}
                  {selectedTime}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  LOCATION
                </p>
                <p className="font-medium text-foreground">
                  {selectedStudioData?.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  CLIENT NAME
                </p>
                <p className="font-medium text-foreground">{profile.name}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/dashboard" })}
                className="w-full rounded-lg"
              >
                Back to Dashboard
              </Button>
              <p className="text-xs text-muted-foreground">
                A confirmation email has been sent to {profile.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
