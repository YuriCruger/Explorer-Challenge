import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@/hooks/auth";
import { ClientRoutes } from "./client.routes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { USER_ROLES } from "@/utils/roles";
import { AdminRoutes } from "./admin.routes";

export function Routes() {
  const { user, role } = useAuth();

  function AccessRoutes() {
    switch (role) {
      case USER_ROLES.ADMIN:
        return <AdminRoutes />;

      case USER_ROLES.CLIENT:
        return <ClientRoutes />;

      default:
        return <ClientRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {user && <Header />}
        <div className="flex-1">
          {!user ? <AuthRoutes /> : <AccessRoutes />}
        </div>
        {user && <Footer />}
      </div>
    </BrowserRouter>
  );
}
