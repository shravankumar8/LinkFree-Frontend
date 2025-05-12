import React from "react";
import { Button } from "@/components/ui/button";
import { FadeIn, FloatingElement } from "./Animations";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
      </div>

      <div className="container-tight grid md:grid-cols-2 gap-12 md:gap-6 items-center">
        <FadeIn className="text-center md:text-left" delay={0.1}>
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium bg-secondary rounded-full">
            Open Source Alternative to Linktree
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Your Links, <span className="text-gradient">Your Brand</span>, Your
            Way!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
            The powerful, customizable, open-source solution for creating
            beautiful link pages that truly represent your brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
              onClick={scrollToWaitlist}
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className=" border-2">
              View Demo
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Join thousands of creators, developers, and brands</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="relative">
          <FloatingElement className="block relative mx-auto md:ml-auto md:mr-0 max-w-xs">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur">
              <div className="bg-gradient-primary h-20 w-full"></div>
              <div className="p-6">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded-full h-20 w-20 border-4 border-white overflow-hidden">
                  <div className="w-full h-full bg-gray-200"></div>
                </div>
                <div className="mt-14 text-center">
                  <h3 className="font-bold text-lg">Shravan Lingampally</h3>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    Developer and musician
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="glass-card rounded-lg py-3 px-4 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                    >
                      <span className="text-sm font-medium">My Portfolio</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-6 w-40 h-40 bg-gradient-accent rounded-xl blur-xl opacity-30 -z-10"></div>
            <div className="absolute -left-4 -top-6 w-40 h-40 bg-gradient-primary rounded-xl blur-xl opacity-30 -z-10"></div>
          </FloatingElement>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
