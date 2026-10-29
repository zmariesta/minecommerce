import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CommercePilot · TanStack Start" },
      { name: "description", content: "Mini demo SSR dan server function TanStack Start." },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="id">
      <head><HeadContent /></head>
      <body style={{ margin: 0, background: "#f6f7fb", color: "#172235", fontFamily: "Inter, system-ui, sans-serif" }}>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
