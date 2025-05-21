import React from "react";
import { ExternalLink, Share, Copy, Link, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface SuccessCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  username: string;
  slug?: string;
  isDefault?: boolean;
  onShareClick: () => void;
}
const VITE_FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const SuccessCard: React.FC<SuccessCardProps> = ({
  open,
  onOpenChange,
  slug,
  isDefault,
  username,
  onShareClick,
}) => {
  const { toast } = useToast();
 let shareUrl;
 if (isDefault) {
   shareUrl = `${VITE_FRONTEND_URL}/${username}`;
 } else {
   shareUrl = `${VITE_FRONTEND_URL}/${username}/${slug}`;
 }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Page link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Page Published!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-muted-foreground mb-4">
                Your Page is now live and can be accessed at this link:
              </p>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Link className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm truncate">{shareUrl}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => {
                  window.open(shareUrl, "_blank");
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                view page
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onShareClick}
              >
                <Share className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                Close
              </Button>
            </DialogClose>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessCard;
