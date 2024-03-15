import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@/hooks/auth";
import { ClientRoutes } from "./client.routes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function Routes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {user && <Header />}
        <div className="flex-1">
          {!user ? <AuthRoutes /> : <ClientRoutes />}
        </div>
        {user && <Footer />}
      </div>
    </BrowserRouter>
  );
}
