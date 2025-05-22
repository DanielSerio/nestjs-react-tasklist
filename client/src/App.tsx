import { type PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";

import { THEME } from "#const/theme";
import { QUERY_CLIENT } from "#const/query-client";

// TODO: Setup router

function Providers({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={THEME}>
      <QueryClientProvider client={QUERY_CLIENT}>
        {children}
      </QueryClientProvider>
    </MantineProvider>
  );
}

function App() {
  return (
    <Providers>
      <div>App</div>;
    </Providers>
  );
}

export default App;
