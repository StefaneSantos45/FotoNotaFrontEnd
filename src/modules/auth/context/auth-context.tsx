"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User, AuthContextType } from "../types/auth"
import { PermissionService } from "../services/permissionService"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("fnpix-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("fnpix-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simula delay API
    await new Promise((res) => setTimeout(res, 1000))

    const userData = PermissionService.getUserByCredentials(email, password)

    if (userData && userData.isActive) {
      const updatedUser = {
        ...userData,
        lastLogin: new Date().toISOString().split("T")[0],
      }
      setUser(updatedUser)
      localStorage.setItem("fnpix-user", JSON.stringify(updatedUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fnpix-user")
    router.push("/login")
  }

  const hasPermission = (resource: string, action: string): boolean => {
    return PermissionService.hasPermission(user, resource, action)
  }

  const hasRole = (roleName: string): boolean => {
    return PermissionService.hasRole(user, roleName)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
