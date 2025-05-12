import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
interface BackgroundImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  backgroundImage: string;
  onBackgroundImageChange: (url: string) => void;
}
const API_URL = import.meta.env.VITE_API_URL;
const BackgroundImageDialog = ({
  open,
  onOpenChange,
  backgroundImage,
  onBackgroundImageChange,
}: BackgroundImageDialogProps) => {
  const { toast } = useToast();
  const [backgroundOptions, setBackgroundOptions] =useState( [
    { id: "blue", color: "bg-blue-100" },
    { id: "purple", color: "bg-purple-100" },
    { id: "pink", color: "bg-pink-100" },
    { id: "green", color: "bg-green-100" },
    { id: "yellow", color: "bg-yellow-100" },
    { id: "gray", color: "bg-gray-100" },
    { id: "Default", color: "bg-gradient-to-r from-blue-500 to-pink-500" },
    {
      id: "custom1",
      image:
        "https://res.cloudinary.com/dfyafvaae/image/upload/v1745518430/pexels-eberhardgross-1367105_2_ampir7.jpg",
    },
    {
      id: "custom2",
      image:
        "https://res.cloudinary.com/dfyafvaae/image/upload/v1745518438/pexels-hngstrm-1939485_sfjuqw.jpg",
    },
    {
      id: "custom3",
      image:
        "https://res.cloudinary.com/dfyafvaae/image/upload/v1745518443/pexels-fwstudio-33348-129731_yd8le7.jpg",
    },
  ]);

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Create FormData to send the file
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadType", "background");
//localhost:3001
http: try {
  const response = await axios.post(
    `${API_URL}/api/user/upload-file`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        // Add authorization header if needed (e.g., JWT token)
        // Authorization: `Bearer ${token}`,
      },
    }
  );

  const { url } = response.data;
  if (url) {
    // Update the background image in the parent component
    onBackgroundImageChange(url);

    // Add the new background to the options
    const newBackgroundOption = {
      id: `custom-${Date.now()}`,
      image: url,
    };
    setBackgroundOptions((prev) => [...prev, newBackgroundOption]);

    toast({
      title: "Success",
      description: "Background image uploaded successfully",
    });
  }
} catch (error) {
  console.error("Error uploading background image:", error);
  toast({
    title: "Error",
    description: "Failed to upload background image",
    variant: "destructive",
  });
}
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Background</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select a background color or upload your own image.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {backgroundOptions.map((option) => (
              <div
                key={option.id}
                onClick={() =>
                  onBackgroundImageChange(option.image || option.color || "")
                }
                className={`
                  h-20 rounded-md cursor-pointer relative overflow-hidden
                  ${!option.image ? option.color : ""}
                  ${
                    backgroundImage === option.image ||
                    backgroundImage === option.color
                      ? "ring-2 ring-primary"
                      : ""
                  }
                `}
                style={
                  option.image
                    ? {
                        backgroundImage: "url(" + option.image + ")",
                        backgroundSize: "cover",
                      }
                    : {}
                }
              >
                {(backgroundImage === option.image ||
                  backgroundImage === option.color) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <Check className="text-white drop-shadow-md" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Upload your own</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("bg-upload")?.click()}
              >
                <Upload size={16} className="mr-2" />
                Upload Image
              </Button>
              <input
                id="bg-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BackgroundImageDialog;
