"use client"

import React, { useState } from "react"
import { useRouter } from "next/router"
import { Eye, EyeOff, Camera, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { useAuth } from "../../modules/auth/context/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const success = await login(email, password)

    if (success) {
      router.push("/painel") 
    } else {
      setError("Email ou senha incorretos")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Bem-vindo ao<br />
              <span className="text-cyan-200">FnPix</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Sistema inteligente de gerenciamento de quiosques de fotos com análises em tempo real
            </p>
          </div>

          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
              <span>Dashboard em tempo real</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
              <span>Relatórios financeiros detalhados</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
              <span>Monitoramento de quiosques</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">FnPix</h1>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-10">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Entrar</h2>
                <p className="text-slate-500">Acesse sua conta para continuar</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-white border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 bg-white border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 pr-12 transition-all duration-200"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-14 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 group mt-8"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
