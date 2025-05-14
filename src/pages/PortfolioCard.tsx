import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FadeIn } from "@/components/Animations";
import NotFound from "@/pages/NotFound";
const API_URL = import.meta.env.VITE_API_URL;
// Define the types for our data structures
interface Link {
  url: string;
  title: string;
  clicks: number;
}

interface SocialLinks {
  [platform: string]: string; // e.g., { "github": "url", "linkedin": "url" }
}

// Define the transformed SocialLink structure for rendering
interface SocialLink {
  id: number;
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "mail"
    | "instagram"
    | "whatsapp";
  url: string;
}

interface PortfolioData {
  username: string;
  displayName: string;
  profilePic: string;
  userBio: string;
  pageBio: string;
  background: string;
  socialLinks: SocialLink[];
  links: Link[];
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

const PortfolioCard: React.FC = () => {
  const { username, slug } = useParams<{ username: string; slug?: string }>();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const url = slug
          ? `${API_URL}/api/portfolio/${username}/${slug}`
          : `${API_URL}/api/portfolio/${username}`;
        const response = await axios.get(url);
        setPortfolioData(response.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile data");
        toast({
          title: "Error",
          description:
            err.response?.data?.message || "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [username, slug, toast]);

  const handleLinkClick = async (linkUrl: string, linkTitle: string) => {
    try {
      // Construct the tracking URL
      window.open(linkUrl, "_blank", "noopener,noreferrer");
      const trackUrl = slug
        ? `${API_URL}/api/portfolio/${username}/${slug}/track-link`
        : `${API_URL}/api/portfolio/${username}/track-link`;

      // Send a POST request to track the click
      await axios.post(trackUrl, { url: linkUrl });

      // Redirect to the link URL after tracking
    } catch (err) {
      console.error("Error tracking link click:", err);
      toast({
        title: "Error",
        description: "Failed to track link click, but redirecting anyway.",
        variant: "destructive",
      });
      // Redirect even if tracking fails to ensure the user experience isn’t interrupted
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  const socialLinksArray: SocialLink[] = portfolioData
    ? Object.entries(portfolioData.socialLinks).map(
        ([platform, url], index) => ({
          id: index + 1,
          platform: platform as SocialLink["platform"],
          url: typeof url === "string" ? url : "",
        })
      )
    : [];

  const getBackgroundStyle = () => {
    const baseClass =
      "min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center py-8 px-4";

    if (!portfolioData?.background) {
      return {
        className: `${baseClass} bg-gradient-to-r from-blue-500 to-pink-500`,
      };
    }

    if (portfolioData.background.startsWith("bg-")) {
      return {
        className: `${baseClass} ${portfolioData.background}`,
      };
    } else {
      return {
        className: baseClass,
        style: {
          backgroundImage: `url(${portfolioData.background})`,
        },
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return <NotFound />;
  }

  return (
    <FadeIn>
      <div {...getBackgroundStyle()}>
        <div className="max-w-md w-full">
          <Card className="backdrop-blur-md bg-white/80 dark:bg-black/50 border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col items-center pt-8 pb-6 px-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg mb-4 overflow-hidden">
                <AvatarImage
                  src={portfolioData.profilePic}
                  alt={portfolioData.displayName}
                  className="h-full w-full object-cover object-center"
                />
                <AvatarFallback className="h-full w-full flex items-center justify-center text-lg">
                  {portfolioData.displayName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-2xl font-bold text-center">
                {portfolioData.displayName}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-center mt-2 max-w-xs">
                {portfolioData.pageBio || portfolioData.userBio}
              </p>
            </div>

            <div className="px-6 pb-8 space-y-4">
              {/* Links */}
              <div className="space-y-3">
                {portfolioData.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-14 bg-white/80 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl backdrop-blur-sm transition-all"
                    onClick={() => handleLinkClick(link.url, link.title)}
                  >
                    {link.title}
                  </Button>
                ))}
              </div>

              {/* Social Links */}
              {socialLinksArray.length > 0 && (
                <div className="flex justify-center gap-4 mt-6">
                  {socialLinksArray.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center pb-4 text-xs text-gray-500">
              <p>Powered by LinkFree</p>
            </div>
          </Card>
        </div>
      </div>
    </FadeIn>
  );
};

export default PortfolioCard;
