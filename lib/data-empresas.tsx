import { 
  Rocket, Sparkles, Cpu, Leaf, Box, Hexagon, 
  Globe, Shield, Code, Droplets, Sun, Zap, Database 
} from "lucide-react";
import React from 'react';

export type Empresa = { 
  name: string; 
  category: string; 
  desc: string; 
  encargado: string; 
  icon: React.ReactNode; 
  logo: string | null; 
  status?: string; 
  social?: { 
    linkedin?: string; 
    instagram?: string; 
    website?: string; 
  }; 
};

export const aceleradas: Empresa[] = [
  {
    name: "NovaTech",
    category: "IA & Data",
    desc: "Plataforma predictiva para retail usando machine learning avanzado.",
    encargado: "María Fernanda López",
    icon: <Cpu size={20} />,
    logo: "/placeholder_elab.svg",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  },
  {
    name: "EcoOrbital",
    category: "Sostenibilidad",
    desc: "Sistemas de monitoreo ambiental basados en sensores IoT.",
    encargado: "Carlos Restrepo",
    icon: <Leaf size={20} />,
    logo: null,
  },
  {
    name: "AeroChain",
    category: "Logística",
    desc: "Gestión de cadena de suministro internacional vía blockchain.",
    encargado: "Andrés Silva",
    icon: <Box size={20} />,
    logo: "/placeholder_elab.svg",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "BioGenix",
    category: "HealthTech",
    desc: "Diagnóstico médico temprano mediante análisis biométrico.",
    encargado: "Dra. Laura Gómez",
    icon: <Hexagon size={20} />,
    logo: null,
  },
  {
    name: "StellarVR",
    category: "EdTech",
    desc: "Educación inmersiva en realidad virtual para colegios.",
    encargado: "Juan Pablo Torres",
    icon: <Globe size={20} />,
    logo: "/placeholder_elab.svg",
  },
  {
    name: "SecureNode",
    category: "Ciberseguridad",
    desc: "Protección de datos empresariales impulsada por IA.",
    encargado: "Diego Martínez",
    icon: <Shield size={20} />,
    logo: null,
  },
  {
    name: "QuantumApp",
    category: "SaaS",
    desc: "Productividad y gestión de proyectos para equipos remotos.",
    encargado: "Valeria Ríos",
    icon: <Code size={20} />,
    logo: "/placeholder_elab.svg",
  },
  {
    name: "AquaPure",
    category: "Cleantech",
    desc: "Purificación de agua portátil para zonas rurales.",
    encargado: "Roberto Muñoz",
    icon: <Droplets size={20} />,
    logo: null,
  },
  {
    name: "Solaris Energy",
    category: "Energía",
    desc: "Optimización de paneles solares residenciales con IA.",
    encargado: "Carmen Rojas",
    icon: <Sun size={20} />,
    logo: "/placeholder_elab.svg",
  },
];

export const tripuladas: Empresa[] = [
  {
    name: "NextWallet",
    category: "Fintech",
    desc: "Billetera digital inclusiva para sectores no bancarizados rurales.",
    encargado: "Felipe Ocampo",
    icon: <Zap size={24} />,
    logo: "/placeholder_elab.svg",
    status: "Fase de Crecimiento",
    social: {
      website: "https://example.com",
      instagram: "https://instagram.com"
    }
  },
  {
    name: "AgroData",
    category: "AgriTech",
    desc: "Predicción de cosechas mediante análisis de suelo e imágenes satelitales.",
    encargado: "Sebastián Mora",
    icon: <Database size={24} />,
    logo: null,
    status: "MVP Validado",
  },
  {
    name: "SpaceHealth",
    category: "HealthTech",
    desc: "Telemedicina especializada para pacientes en áreas remotas extremas.",
    encargado: "Mónica castaño",
    icon: <Rocket size={24} />,
    logo: "/placeholder_elab.svg",
    status: "Levantamiento de Capital",
  },
];
