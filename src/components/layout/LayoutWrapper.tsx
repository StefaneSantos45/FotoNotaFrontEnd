"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../sidebar";
import Header from "../header";
import { useAuth } from "../../modules/auth/context/auth-context";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { user, isLoading:loading } = useAuth();

  // Defina rotas que não precisam de autenticação
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthPage = authRoutes.includes(pathname);

  // Verifica autenticação, redireciona se necessário
  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/login");
    }
  }, [loading, user, isAuthPage, router]);

  if (loading) {
    // Enquanto carrega info do usuário, mostra loading simples
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user && !isAuthPage) {
    // Enquanto redireciona, evita renderizar UI protegida
    return null;
  }

  return (
    <div className="flex">
      {!isAuthPage && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      )}

      <div className={`flex flex-col flex-1 min-h-screen ${!isAuthPage ? "ml-16 lg:ml-64" : ""}`}>
        {!isAuthPage && (
          <Header
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
          />
        )}

        <main className={isAuthPage ? "" : "p-4"}>
          {children}
        </main>
      </div>
    </div>
  );
}
