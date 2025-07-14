"use client"

import { useAuth } from "@/modules/auth/context/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShieldX } from "lucide-react"
import type { ReactNode } from "react"

interface PermissionGuardProps {
  resource: string
  action: string
  children: ReactNode
  fallback?: ReactNode
  showError?: boolean
}

export function PermissionGuard({
  resource,
  action,
  children,
  fallback = null,
  showError = false,
}: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  const isAuthorized = hasPermission(resource, action)

  if (!isAuthorized) {
    if (showError) {
      return (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <ShieldX className="h-4 w-4" />
          <AlertDescription className="text-red-700">
            Você não tem permissão para acessar este recurso.
          </AlertDescription>
        </Alert>
      )
    }

    return <>{fallback}</>
  }

  return <>{children}</>
}
