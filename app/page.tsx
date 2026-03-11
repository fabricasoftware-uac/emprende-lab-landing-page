import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import SpaceLabProgram from '@/components/spacelab-program';
import Startups from '@/components/startups';
import InnovationUnits from '@/components/innovation-units';
import Footer from '@/components/footer';
import FloatingElements from '@/components/floating-elements';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Cosmic background elements */}
      <FloatingElements />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* SpaceLab Program Section */}
      <SpaceLabProgram />

      {/* Startups Section */}
      <Startups />

      {/* Innovation Units Section */}
      <InnovationUnits />

      {/* Footer */}
      <Footer />
    </div>
  );
}
