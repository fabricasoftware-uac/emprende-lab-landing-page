import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Academia from "@/components/academia";
import Transferencia from "@/components/transferencia";
import SpaceLabProgram from "@/components/spacelab-program";
import Proyectos from "@/components/proyectos";
import InnovationUnits from "@/components/innovation-units";
import Empresas from "@/components/empresas";
import Becados from "@/components/becados";
import Tienda from "@/components/tienda";
import Equipo from "@/components/equipo";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Cosmic background elements */}
      <FloatingElements />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Innovation Units Section (Servicios) */}
      <InnovationUnits />
      
      {/* Academia */}
      <Academia />

      {/* Transferencia de Conocimiento */}
      <Transferencia />

      {/* SpaceLab Program Section (Aceleración) */}
      <SpaceLabProgram />

      {/* Proyectos Destacados */}
      <Proyectos />


      {/* Empresas */}
      <Empresas />

      {/* Becados */}
      <Becados />

      {/* Tienda */}
      <Tienda />

      {/* Tripulación Estelar */}
      <Equipo />

      {/* Footer */}
      <Footer />
    </div>
  );
}
