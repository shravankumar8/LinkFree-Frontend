
import React from "react";
import { FadeIn } from "./Animations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required, just your creativity."
  },
  {
    number: "02",
    title: "Customize",
    description: "Choose a template and customize it with your links, colors, animations, and branding."
  },
  {
    number: "03",
    title: "Share",
    description: "Share your unique LinkFree URL across all your social platforms and start engaging your audience."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple steps to get <span className="text-gradient">started</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            LinkFree is designed to be intuitive and easy to use. 
            Follow these three simple steps to create your perfect link page.
          </p>
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <FadeIn key={index} delay={0.2 * index} threshold={0.2}>
            <div className="step-card relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-2xl"></div>
              <div className="relative z-10">
                <span className="text-5xl font-bold text-gradient">{step.number}</span>
                <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <FadeIn>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default HowItWorks;
