import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

interface Logged {
  logged?: boolean;
}

export function Routes() {
  const { logged }: Logged = useAuth();

  return (
    <BrowserRouter>{logged ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}
