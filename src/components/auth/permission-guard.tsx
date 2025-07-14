"use client"

import type React from "react"
import { useAuth } from "../../modules/auth/context/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShieldX } from "lucide-react"

interface PermissionGuardProps {
  resource: string
  action: string
  children: React.ReactNode
  fallback?: React.ReactNode
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

  if (!hasPermission(resource, action)) {
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
