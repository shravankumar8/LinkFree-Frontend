
import React, { useState } from "react";
import { FadeIn, ScaleOnHover } from "./Animations";
import { Button } from "@/components/ui/button";

// Sample template data
const templates = [
  {
    id: 1,
    name: "Minimalist",
    description: "Clean and simple design focusing on content",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    accentColor: "bg-gradient-primary"
  },
  {
    id: 2,
    name: "Gradient Fusion",
    description: "Vibrant gradients that catch attention",
    bgColor: "bg-gradient-primary",
    textColor: "text-white",
    accentColor: "bg-white"
  },
  {
    id: 3,
    name: "Glassmorphism",
    description: "Modern glass effect with subtle transparency",
    bgColor: "glass-card",
    textColor: "text-gray-900",
    accentColor: "bg-gradient-accent"
  },
  {
    id: 4,
    name: "Dark Mode",
    description: "Sleek dark theme for a modern look",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    accentColor: "bg-gradient-secondary"
  },
  {
    id: 5,
    name: "Professional",
    description: "Elegant design for businesses and professionals",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-900",
    accentColor: "bg-indigo-600"
  },
  {
    id: 6,
    name: "Playful",
    description: "Fun and colorful design for creative profiles",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-900",
    accentColor: "bg-gradient-accent"
  }
];

const Templates: React.FC = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  return (
    <section id="templates" className="section bg-secondary/50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Express yourself with <span className="text-gradient">stunning</span> templates
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from a variety of professionally designed templates or create your own.
            Each template is fully customizable to match your personal brand.
          </p>
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <FadeIn key={template.id} delay={0.05 * template.id} threshold={0.1}>
            <div 
              className="template-card-container"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className={`template-card ${template.bgColor} overflow-hidden shadow-lg`}>
                <div className={`h-16 ${template.accentColor}`}></div>
                <div className="p-6">
                  <div className="mx-auto w-16 h-16 rounded-full border-4 border-white mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gray-200"></div>
                  </div>
                  
                  <h3 className={`text-lg font-bold text-center ${template.textColor}`}>
                    {template.name}
                  </h3>
                  <p className={`text-sm text-center mt-1 ${template.textColor} opacity-70`}>
                    {template.description}
                  </p>
                  
                  <div className="mt-6 space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div 
                        key={item} 
                        className={`h-10 rounded-lg ${
                          template.bgColor === "bg-gray-900" ? "bg-gray-800" : 
                          template.bgColor.includes("gradient") ? "bg-white/20" : "bg-gray-100"
                        } ${template.textColor}`}
                      ></div>
                    ))}
                  </div>
                  
                  {hoveredTemplate === template.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                      <Button className="bg-white text-gray-900 hover:bg-white/90">
                        Use Template
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <FadeIn>
          <Button variant="outline" size="lg" className="border-2">
            View All Templates
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default Templates;
