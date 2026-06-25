import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useClientAuth } from "@/lib/client-auth-store";
import { PageShell } from "@/components/site/PageShell";
import { navCrumbs } from "@/lib/navigation";
import { useClientAssessment } from "@/lib/client-assessment-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard")({
  component: ClientDashboard,
  meta: () => [
    {
      title: "Dashboard - PhysioFlex",
      description: "Your physiotherapy dashboard",
    },
  ],
});

function ClientDashboard() {
  const navigate = useNavigate();
  const { profile, logout } = useClientAuth();
  const { assessment } = useClientAssessment();

  // Redirect to login if not authenticated
  if (!profile) {
    navigate({ to: "/login" });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <PageShell crumbs={navCrumbs.dashboard()} showFooter={false}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="type-page text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, {profile.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="h-11 min-h-11 shrink-0 gap-2 self-start"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <User className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    Profile Information
                  </h2>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="size-4" />
                      <span>
                        {profile.name} • {profile.age} years old • {profile.gender}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="size-4" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{profile.city}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: "/login/user/profile" })}
                className="h-11 min-h-11 shrink-0 gap-2 self-start"
              >
                <Edit className="size-4" />
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Assessment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Assessment
          </h2>
          {assessment ? (
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="size-5 text-green-600" />
                    <span className="font-semibold text-foreground">
                      Assessment Completed
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assessment.painPoints?.length || 0} pain point
                    {(assessment.painPoints?.length || 0) !== 1 ? "s" : ""} identified
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    {assessment.painPoints?.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                        {point.area} - Level {point.level}/10 ({point.type})
                      </div>
                    ))}
                  </div>
                </div>
                <Badge
                  className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  ✓ Complete
                </Badge>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                Severity: <strong className="text-foreground">{assessment.severity}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We recommend booking a session with one of our physiotherapists to create a personalized treatment plan.
              </p>
              <Button
                onClick={() => navigate({ to: "/booking" })}
                className="mt-4 gap-2"
              >
                Book a Session
                <ArrowRight className="size-4" />
              </Button>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="text-center py-6">
                <Clock className="size-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  You haven't completed an assessment yet
                </p>
                <Button
                  onClick={() => navigate({ to: "/assessment/start" })}
                  className="gap-2"
                >
                  <Plus className="size-4" />
                  Start Assessment
                </Button>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Health Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Health Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Physical Metrics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium text-foreground">
                    {profile.height} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium text-foreground">
                    {profile.weight} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lifestyle</span>
                  <span className="font-medium text-foreground capitalize">
                    {profile.lifestyle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupation</span>
                  <span className="font-medium text-foreground">
                    {profile.occupation}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Medical History
              </h3>
              <div className="space-y-3 text-sm">
                {profile.medicalHistory && profile.medicalHistory.length > 0 ? (
                  <>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        Medical Conditions:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {profile.medicalHistory.map((item, idx) => (
                          <Badge key={idx} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No medical conditions reported</p>
                )}

                {profile.previousInjuries && profile.previousInjuries.length > 0 ? (
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Previous Injuries:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.previousInjuries.map((injury, idx) => (
                        <Badge key={idx} variant="secondary">
                          {injury}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No previous injuries reported</p>
                )}
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Upcoming Sessions
          </h2>
          <Card className="p-6">
            <div className="text-center py-8">
              <Clock className="size-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No upcoming sessions scheduled
              </p>
              <Button
                onClick={() => navigate({ to: "/booking" })}
                variant="outline"
                className="mt-4"
              >
                Book Now
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all">
              <h3 className="font-semibold text-foreground mb-2">
                Common Pain Management Tips
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn best practices for managing pain during daily activities
              </p>
            </Card>
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all">
              <h3 className="font-semibold text-foreground mb-2">
                Physiotherapy FAQ
              </h3>
              <p className="text-sm text-muted-foreground">
                Get answers to frequently asked questions about our services
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}