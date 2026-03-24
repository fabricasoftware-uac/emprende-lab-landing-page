"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ShieldAlert, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FloatingElements from "@/components/floating-elements";

export default function Unauthorized() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-linear-to-b from-[#2e1a47] to-background text-foreground">
      {/* Cosmic background elements to stay consistent with the theme */}
      <FloatingElements />

      <Card className="z-10 w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-red-500/20 border border-red-500/50">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-red-400 to-purple-400">
            Acceso Denegado
          </CardTitle>
          <CardDescription className="text-gray-400 mt-2">
            No tienes los permisos necesarios para acceder a esta sección de la
            plataforma.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-gray-300">
          <p>
            Si crees que esto es un error, por favor contacta con el
            administrador del sistema.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Regresar al Login
            </Button>
          </Link>

        </CardFooter>
      </Card>
    </div>
  );
}
