import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'

const query = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={query}>
      <Router />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
