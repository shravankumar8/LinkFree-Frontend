import React from "react";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { MessageSquare } from "lucide-react"; // Using MessageSquare as an alternative for WhatsApp

type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "mail"
  | "instagram"
  | "whatsapp";

interface SocialIconProps {
  platform: SocialPlatform;
  size?: number;
  className?: string;
}

const SocialIcon = ({
  platform,
  size = 20,
  className = "",
}: SocialIconProps) => {
  const getIcon = () => {
    switch (platform) {
      case "github":
        return <Github size={size} />;
      case "linkedin":
        return <Linkedin size={size} />;
      case "twitter":
        return <Twitter size={size} />;
      case "mail":
        return <Mail size={size} />;
      case "instagram":
        return <Instagram size={size} />;
      case "whatsapp":
        return <MessageSquare size={size} />; // Using MessageSquare as an alternative for WhatsApp
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {getIcon()}
    </div>
  );
};

export default SocialIcon;
