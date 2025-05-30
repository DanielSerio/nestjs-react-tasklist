import { type PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { THEME } from "#const/theme";
import { QUERY_CLIENT } from "#const/query-client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <MantineProvider defaultColorScheme="dark" theme={THEME}>
        <Notifications />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
