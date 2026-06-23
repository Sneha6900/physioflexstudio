import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/login/user")({
  component: LoginUserLayout,
});

function LoginUserLayout() {
  return <Outlet />;
}
