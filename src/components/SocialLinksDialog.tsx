import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import SocialIcon from "./SocialIcon";

export type SocialLink = {

  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "mail"
    | "instagram"
    | "whatsapp";
  url: string;

};

interface SocialLinksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socialLinks: SocialLink[];
  onSocialLinksChange: (links: SocialLink[]) => void;
}

const SocialLinksDialog = ({
  open,
  onOpenChange,
  socialLinks,
  onSocialLinksChange,
}: SocialLinksDialogProps) => {
  const availablePlatforms = [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "mail", label: "Email" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "github", label: "GitHub" },
    { id: "twitter", label: "Twitter" },
    { id: "instagram", label: "Instagram" },
  ];

  const toggleLinkStatus = (platform: string) => {
    onSocialLinksChange(
      socialLinks.map((link) =>
        link.platform === platform ? { ...link } : link
      )
    );
  };

  const updateLinkUrl = (platform: string, url: string) => {
    onSocialLinksChange(
      socialLinks.map((link) =>
        link.platform === platform ? { ...link, url } : link
      )
    );
  };

  const addSocialLink = (
    platform:
      | "github"
      | "linkedin"
      | "twitter"
      | "mail"
      | "instagram"
      | "whatsapp"
  ) => {
    const existingLink = socialLinks.find((link) => link.platform === platform);
    if (existingLink) return;

    const newLink = {
      id: Date.now(),
      platform,
      url: "",

    };
    onSocialLinksChange([...socialLinks, newLink]);
  };

  const removeSocialLink = (platform: string) => {
    onSocialLinksChange(
      socialLinks.filter((link) => link.platform !== platform)
    );
  };

  const getUnusedPlatforms = () => {
    const usedPlatforms = socialLinks.map((link) => link.platform);
    return availablePlatforms.filter(
      (platform) => !usedPlatforms.includes(platform.platform as any)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Social Icons</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add your social profiles, email and more as linked icons on your
            LinkFree.
          </p>

          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.platform} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <SocialIcon platform={link.platform} />
                    <span className="font-medium">
                      {
                        availablePlatforms.find((p) => p.id === link.platform)
                          ?.label
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Switch
                      checked={link.enabled}
                      onCheckedChange={() => toggleLinkStatus(link.id)}
                    /> */}
                    <button
                      onClick={() => removeSocialLink(link.platform)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <Input
                  value={link.url}
                  onChange={(e) => updateLinkUrl(link.platform, e.target.value)}
                  placeholder={`Enter your ${link.platform} URL`}
                  className="w-full bg-gray-50 text-sm"
                />
              </div>
            ))}
          </div>

          {getUnusedPlatforms().length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Add social icon</p>
              <div className="flex flex-wrap gap-2">
                {getUnusedPlatforms().map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addSocialLink(platform.id as any)}
                    className="flex items-center gap-2"
                  >
                    <SocialIcon platform={platform.id as any} size={16} />
                    <span>{platform.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksDialog;
