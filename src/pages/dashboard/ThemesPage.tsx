import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
}

const ThemesPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTheme, setActiveTheme] = useState<string>("minimal");

  const themes: Theme[] = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, simple, and elegant design",
      preview: "placeholder.svg",
      isPremium: false,
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Sleek dark theme for night viewing",
      preview: "placeholder.svg",
      isPremium: false,
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Beautiful color gradients for a modern look",
      preview: "placeholder.svg",
      isPremium: true,
    },
    {
      id: "retro",
      name: "Retro",
      description: "Vintage vibes with nostalgic elements",
      preview: "placeholder.svg",
      isPremium: true,
    },
  ];

  const handleApplyTheme = (themeId: string) => {
    if (themes.find((t) => t.id === themeId)?.isPremium) {
      toast({
        title: "Premium Theme",
        description: "This is a premium theme. Upgrade to access it!",
      });
      return;
    }

    setActiveTheme(themeId);
    toast({
      title: "Theme Applied",
      description: `The ${
        themes.find((t) => t.id === themeId)?.name
      } theme has been applied.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Themes</h1>
        <p className="text-muted-foreground mt-1">
          Customize how your profile looks to visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`overflow-hidden transition-all ${
              activeTheme === theme.id ? "ring-2 ring-primary" : ""
            } ${theme.isPremium ? "opacity-75" : ""}`}
          >
            <div className="aspect-video bg-muted">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    {theme.name}
                    {theme.isPremium && (
                      <span className="ml-2 text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-normal flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Premium
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </div>
                {activeTheme === theme.id && (
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleApplyTheme(theme.id)}
                variant={activeTheme === theme.id ? "secondary" : "outline"}
                className="w-full"
                disabled={activeTheme === theme.id}
              >
                {activeTheme === theme.id
                  ? "Applied"
                  : theme.isPremium
                  ? "Upgrade to Use"
                  : "Apply Theme"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemesPage;
