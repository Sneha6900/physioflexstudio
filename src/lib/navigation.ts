import type { BreadcrumbItem } from "@/components/site/Breadcrumbs";

export const navCrumbs = {
  programs: (): BreadcrumbItem[] => [
    { label: "Home", to: "/", homeSection: "exercises" },
    { label: "Programs" },
  ],
  experts: (): BreadcrumbItem[] => [
    { label: "Home", to: "/", homeSection: "experts" },
    { label: "Experts" },
  ],
  expert: (name: string): BreadcrumbItem[] => [
    { label: "Home", to: "/", homeSection: "experts" },
    { label: "Experts", to: "/specialists/" },
    { label: name },
  ],
  assessment: (): BreadcrumbItem[] => [
    { label: "Home", to: "/", homeSection: "journey" },
    { label: "Assessment" },
  ],
  assessmentStart: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Assessment", to: "/assessment/start" },
    { label: "Start" },
  ],
  assessmentPainDetails: (area: string): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Assessment", to: "/assessment/start" },
    { label: area },
  ],
  assessmentResults: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Assessment", to: "/assessment/start" },
    { label: "Results" },
  ],
  recovery: (): BreadcrumbItem[] => [
    { label: "Home", to: "/", homeSection: "journey" },
    { label: "Assessment", to: "/assessment" },
    { label: "Recovery" },
  ],
  booking: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Booking" },
  ],
  dashboard: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Dashboard" },
  ],
  login: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Login" },
  ],
  loginSignup: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Login", to: "/login" },
    { label: "Sign up" },
  ],
  loginProfile: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Login", to: "/login" },
    { label: "Profile" },
  ],
  physioLogin: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Physiotherapist Login" },
  ],
  physioDashboard: (): BreadcrumbItem[] => [
    { label: "Home", to: "/" },
    { label: "Physiotherapist Login", to: "/physio/login" },
    { label: "Dashboard" },
  ],
};
