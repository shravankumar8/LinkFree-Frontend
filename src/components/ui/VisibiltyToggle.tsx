import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface VisibilityToggleProps {
  isVisible: boolean;
  onVisibilityChange: (visibility: boolean) => void;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  isVisible,
  onVisibilityChange,
}) => {
  const handleToggle = (checked: boolean) => {
    onVisibilityChange(checked);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          aria-label={isVisible ? "Page is visible" : "Page is hidden"}
        >
          {isVisible ? (
            <>
              <EyeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Visible</span>
            </>
          ) : (
            <>
              <EyeOffIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Hidden</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Page visibility</h4>
              <p className="text-sm text-muted-foreground">
                Control whether your page is visible to others
              </p>
            </div>
            <Switch
              id="visibility-toggle"
              checked={isVisible}
              onCheckedChange={handleToggle}
            />
          </div>
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center space-x-2">
              {isVisible ? (
                <EyeIcon className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOffIcon className="h-4 w-4 text-amber-500" />
              )}
              <p className="text-sm">
                {isVisible
                  ? "Your page is currently visible to everyone"
                  : "Your page is currently hidden from public view"}
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VisibilityToggle;
