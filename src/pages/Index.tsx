
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Templates from "@/components/Templates";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  useEffect(() => {
    // Set title and description
    document.title = "LinkFree - Your Links, Your Brand, Your Way";
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Templates />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
