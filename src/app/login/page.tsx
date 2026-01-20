"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-xl shadow-indigo-500/25"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Rise</h1>
          <p className="text-indigo-200/70">Gestão de Redes Sociais</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={cn(
                  "w-full px-4 py-3 rounded-xl",
                  "bg-white/10 border border-white/20",
                  "text-white placeholder-indigo-200/50",
                  "focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20",
                  "transition-all duration-200"
                )}
                placeholder="seu@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-3 pr-12 rounded-xl",
                    "bg-white/10 border border-white/20",
                    "text-white placeholder-indigo-200/50",
                    "focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20",
                    "transition-all duration-200"
                  )}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-indigo-200/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-400/20"
                />
                <span className="text-sm text-indigo-200/70">Lembrar-me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-300 hover:text-white transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl",
                "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold",
                "hover:from-indigo-600 hover:to-purple-700",
                "shadow-lg shadow-indigo-500/25",
                "transition-all duration-200",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-indigo-200/50 text-center mb-2">
              Credenciais de demonstração:
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-indigo-200/70">
                Email: <span className="text-white">admin@rise.com</span>
              </span>
              <span className="text-indigo-200/70">
                Senha: <span className="text-white">demo123</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-indigo-200/50 text-sm">
            <Shield className="w-4 h-4" />
            <span>Conexão segura</span>
          </div>
          <p className="text-indigo-200/30 text-xs mt-2">
            © 2024 Rise - Gestão de Redes Sociais
          </p>
        </div>
      </motion.div>
    </div>
  );
}
