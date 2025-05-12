import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import axios from "axios";
import { profile } from "console";
const API_URL = import.meta.env.VITE_API_URL;
const ProfileSettings: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/profile/profileinfo`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { username, displayName, bio, profilePic, email } =
          response.data.user;
        setFormData({ username, displayName, bio, profilePic });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProfilePictureSubmit = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const response = await axios.post(
        `${API_URL}/api/user/profile-picture`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const profilePicUrl = response.data.url;
      setFormData((prev) => ({ ...prev, profilePic: profilePicUrl }));
      toast({
        title: "Image uploaded",
        description: "Profile picture uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.response?.data?.error || "Upload failed. Try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }

    //  cut till here
  };



const handleProfilePicUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type and size
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    toast({
      title: "Invalid file type",
      description: "Please upload a JPG, PNG, or GIF image.",
      variant: "destructive",
    });
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    toast({
      title: "File too large",
      description: "Image must be under 2MB.",
      variant: "destructive",
    });
    return;
  }

  // Prepare data for upload in the specified format
await handleProfilePictureSubmit(file);
};

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/api/profile/update`,
        {
          displayName: formData.displayName,
          bio: formData.bio,
          profilePic: formData.profilePic,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFormData({
        ...formData,
        displayName: response.data.user.displayName,
        bio: response.data.user.bio,
        profilePic: response.data.user.profilePic,

      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Update your profile information and preferences.
        </p>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                    <img
                      src={formData.profilePic || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="profile-pic-upload"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload new photo</span>
                  </label>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-medium text-lg">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("profile-pic-upload").click()
                      }
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload new image"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="yourusername"
                  value={formData.username}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  This is your public username - linkfree.com/
                  {formData.username}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="Your Name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell visitors a little about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Brief description for your profile. Maximum 160 characters.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
