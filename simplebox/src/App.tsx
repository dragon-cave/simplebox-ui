import { AuthProvider } from "./contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";

import AppRouter from "./routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
