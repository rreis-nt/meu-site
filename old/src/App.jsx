import React from 'react';
import Hero from './components/Hero';
import WelcomeMessage from './components/WelcomeMessage';
import CallToAction from './components/CallToAction';
import HeroImage from './components/HeroImage';
import About from './components/About';
import Projects from './components/Projects';
import DiscordStatus from './components/DiscordStatus';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />
      <Hero />
      <WelcomeMessage />
      <About />
      <Projects />
      <DiscordStatus />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
