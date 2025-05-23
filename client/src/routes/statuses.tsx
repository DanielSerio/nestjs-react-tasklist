import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statuses")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/statuses"!</div>;
}
