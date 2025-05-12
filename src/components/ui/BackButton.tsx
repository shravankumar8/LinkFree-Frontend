import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface BackButtonProps extends ButtonProps {
  fallbackPath?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = "/",
  className,
  ...props
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back if possible; otherwise, go to the fallback path
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={cn("gap-1 hover:bg-muted", className)}
      aria-label="Go back"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
