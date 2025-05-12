import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  ExternalLink,
  Download,
  Share as ShareIcon,
  Twitter,
  Facebook,
  Instagram,
  Link,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username?: string;
  slug?: string;
  isDefault?: boolean;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onOpenChange,
  username ,
  slug ,
  isDefault,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Generate a sample share URL - in a real app this would be a real URL
  let shareUrl;
  if (isDefault) {
    shareUrl = `https://linkfree.tech/${username}`;
  }else{
    shareUrl = `https://linkfree.tech/${username}/${slug}`;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);

    toast({
      title: "Link copied",
      description: "Profile link has been copied to clipboard",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          `https://linkfree.tech/${username}`
        )}&text=Check out my LinkFree profile!`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `https://linkfree.tech/${username}`
        )}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct share URL, but we'll show a toast
        toast({
          title: "Instagram sharing",
          description:
            "Copy the link and share it on your Instagram bio or story",
        });
        return;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }

    toast({
      title: "Sharing to " + platform,
      description: `Your profile is being shared to ${platform}`,
    });
  };

  const handleDownload = () => {
    // In a real app, this would generate a downloadable file or image
    toast({
      title: "Download started",
      description: "Your profile screenshot is being downloaded",
    });
  };

  const handlePreview = () => {
    // In a real app, this would open the live profile in a new tab
    window.open(`https://linkfree.tech/${username}`, "_blank");

    toast({
      title: "Opening preview",
      description: "Your profile is opening in a new tab",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-2xl">Share your LinkFree</SheetTitle>
          <SheetDescription>
            Get more visitors by sharing your LinkFree everywhere.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col space-y-4">
          {/* Copy link section */}
          <div className="flex space-x-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button onClick={handleCopyLink} variant="outline">
              {copied ? "Copied" : "Copy"}
              <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Social media sharing options */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Share on social media</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleSocialShare("twitter")}
                variant="outline"
                className="flex-1"
              >
                <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                Twitter
              </Button>
              <Button
                onClick={() => handleSocialShare("facebook")}
                variant="outline"
                className="flex-1"
              >
                <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                Facebook
              </Button>
              <Button
                onClick={() => handleSocialShare("instagram")}
                variant="outline"
                className="flex-1"
              >
                <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                Instagram
              </Button>
            </div>
          </div>

          {/* Share options with icons */}
          <div className="border rounded-lg divide-y">
            <button
              onClick={handlePreview}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="rounded-lg bg-yellow-100 p-3 mr-4">
                  <ExternalLink className="h-5 w-5 text-yellow-600" />
                </div>
                <span>Open my LinkFree</span>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </button>

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="rounded-lg bg-green-100 p-3 mr-4">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
                <span>Download as image</span>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="rounded-lg bg-purple-100 p-3 mr-4">
                  <Link className="h-5 w-5 text-purple-600" />
                </div>
                <span>Copy link</span>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShareDialog;
