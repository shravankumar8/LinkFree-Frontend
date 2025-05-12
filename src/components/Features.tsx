
import React from "react";
import { FadeIn } from "./Animations";

import { 
  Palette, 
  Zap, 
  Heart, 
  Sparkles, 
  Lock,
  Users
} from "lucide-react";

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Fully Customizable",
    description: "Personalize every aspect of your page with customizable templates, colors, and animations."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance, ensuring your links load instantly for your audience."
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Always Free",
    description: "100% free to use with no hidden costs or premium tiers. All features available to everyone."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Open Source",
    description: "Built and maintained by a global community of developers. Contribute and help shape the future."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Beautiful Animations",
    description: "Add eye-catching animations to make your page stand out from the crowd."
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Analytics & Privacy",
    description: "Track visitor insights while respecting privacy. No invasive tracking or data selling."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="section relative">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-subtle opacity-70 blur-3xl"></div>
      </div>
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Designed for <span className="text-gradient">creators</span> who value simplicity
          </h2>
          <p className="text-lg text-muted-foreground">
            LinkFree combines powerful features with an intuitive interface, 
            giving you everything you need to create the perfect link page.
          </p>
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FadeIn key={index} delay={0.1 * index} threshold={0.2}>
            <div className="glass-card p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-5px]">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-6 bg-gradient-primary text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Features;
