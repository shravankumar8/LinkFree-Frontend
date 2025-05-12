import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/Animations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Share,
  Palette,
  ExternalLink,
  Image,
  UserRound,
  Edit,
  Save,
  Check,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import SocialIcon from "@/components/SocialIcon";
import SocialLinksDialog, { SocialLink } from "@/components/SocialLinksDialog";
import BackgroundImageDialog from "@/components/BackgroundImageDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ShareDialog from "@/components/ShareDialog";
import BackButton from "@/components/ui/BackButton";
import VisibilityToggle from "@/components/ui/VisibiltyToggle";
import AnalyticsCard from "@/components/AnalyticsCard";

const EditPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<any>("");
  const [isDefault, setIsDefault] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const [linkClicks, setLinkClicks] = useState(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [slug, setSlug] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [isBackgroundDialogOpen, setIsBackgroundDialogOpen] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [username,setUsername] = useState("");
const API_URL = import.meta.env.VITE_API_URL;
   const [isVisible, setIsVisible] = useState(true);
  
  type SocialLink = {
    id: number;
    platform: string;
    url: string;

  };

  interface BackgroundTemplate {
    kind: "gradient" | "image";
    value: string;
  }

  const handleVisibilityChange = async (visibility: boolean) => {
    try {
      // In a real app, send a request to your API
      // This is a simulated API call

      const visibilityResponse = await axios.put(
        `${API_URL}/api/pages/visibility`,
        {
          id,
          visibility,
        },
        {
          withCredentials: true,
        }
      );
     
      console.log(visibilityResponse)

   

      setIsVisible(visibility);

      toast({
        title: visibility ? "Page is now visible" : "Page is now hidden",
        description: visibility
          ? "Your page is now visible to everyone"
          : "Your page is now hidden from public view",
      });
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast({
        title: "Failed to update visibility",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const updatedPageData = {
        bio,
        links: links.map((link) => ({
          title: link.title,
          url: link.url,
          clicks: link.clicks || 0,
        })), // Remove id, backend will handle as JSON array
        socialLinks,
        background: backgroundImage,
      };

      const res = await axios.put(
        `${API_URL}/api/pages/${id}`,
        updatedPageData,
        { withCredentials: true }
      );
       toast({
         title: "Changes saved",
         description: "Your profile has been updated successfully",
       });
    } catch (error) {
      toast({
        title: "Save failed",
        description:
          "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      });
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };
   const totalLinkClicks = links.reduce(
     (total, link) => total + (link.clicks || 0),
     0
   );

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/pages/${id}`, {
          withCredentials: true,
        });
        const pageData = res.data;
        console.log("raw pageData:", res.data);
        setPage(pageData);
        setUserData(pageData.user.profilePic);
        setBackgroundImage(pageData.background || "");
        setBio(pageData.bio || pageData.user.bio || "");
        setLinks(pageData.links || []);
        setDisplayName(pageData.user.displayName || "");
        console.log("raw links:", pageData.socialLinks);
        setSlug(pageData.slug || "");
        setTotalViews(pageData.totalViews || 0);
        setLinkClicks(pageData.linkClicks || 0);
        setIsDefault(pageData.isDefault || false);
        setUsername(pageData.user.username || "");
        setIsVisible(pageData.visibility  || false);
        
        setSocialLinks(
          (pageData.socialLinks || []).map((link) => ({
            id: link.id,
            platform: link.platform,
            url: typeof link.url === "string" ? link.url : "",
          }))
        );

        setBackgroundImage(pageData.background || "bg-blue-100");
      } catch (error) {
        toast({ title: "Error", description: "Failed to load page" });
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [id]);

  const addLink = () => {
    const newLink = {
      title: "",
      url: "",

    };
    setLinks([...links, newLink]);
  };

  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const updateLink = (title, field, value) => {
    
    setLinks(
      links.map((link) => (link.title === title ? { ...link, [field]: value } : link))
    );
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
  };
  const getBackgroundStyle = () => {
    const baseClass =
      "w-full rounded-lg overflow-hidden aspect-[9/16] relative mb-4 flex flex-col items-center";

    if (backgroundImage && backgroundImage.startsWith("bg-")) {
      console.log(backgroundImage);
      return { className: `${baseClass} ${backgroundImage}` };
    } else if (backgroundImage) {
      return {
        className: baseClass,
        style: {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      };
    } else {
      return {
        className: `${baseClass} bg-gradient-to-r from-blue-500 to-pink-500`,
      };
    }
  };

  return (
    <div className="min-h-screen  bg-background">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <FadeIn>
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BackButton fallbackPath="/" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  My LinkFree
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your profile and links
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex md:flex-row md:space-y-0 md:space-x-3 space-x-3">
              <VisibilityToggle
                isVisible={isVisible}
                onVisibilityChange={handleVisibilityChange}
              />
              <Button
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-accent hover:bg-accent/90"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleShareClick}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={() => setIsBackgroundDialogOpen(true)}>
                <Palette className="mr-2 h-4 w-4" />
                Theme
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Profile Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">ID</label>

                      {isDefault ? (
                        <span className="text-sm mx-3 font-medium text-muted-foreground truncate">
                          {slug}
                        </span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-muted-foreground truncate max-w-xs">
                            {username}
                          </span>
                          <Input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                          Social Links
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsSocialDialogOpen(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-3 p-3 border rounded-md">
                        {socialLinks.map((link) => (
                          <div
                            key={link.id}
                            className="w-10 h-10 rounded-full border flex items-center justify-center"
                          >
                            <SocialIcon platform={link.platform} />
                          </div>
                        ))}
                        {socialLinks.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No social links added yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Links Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Links</CardTitle>
                  <Button onClick={addLink}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {links.map((link, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <Input
                              type="text"
                              value={link.title}
                              placeholder="Link Title"
                              onChange={(e) =>
                                updateLink(link.title, "title", e.target.value)
                              }
                              className="font-medium border-none focus:outline-none focus:ring-0"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeLink(link.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <Input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            updateLink(link.title, "url", e.target.value)
                          }
                          className="w-full bg-gray-50 px-3 py-2 rounded-md text-sm"
                          placeholder="https://"
                        />
                      </div>
                    ))}
                    {links.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>
                          No links added yet. Click the Add button to create
                          your first link!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Preview Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden p-4 flex flex-col items-center">
                    <div {...getBackgroundStyle()}>
                      <div
                        className="w-16 h-16 rounded-full bg-gray-200 mt-8 mb-2 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${userData})`,
                        }}
                      ></div>{" "}
                      <h3 className="font-bold text-lg">{displayName}</h3>
                      <p className="text-base text-center text-gray-600 mb-6 px-4">
                        {bio}
                      </p>
                      <div className="w-full px-4 space-y-3 mt-auto mb-4">
                        {links.map((link) => (
                          <div
                            onClick={() => window.open(link.url, "_blank")}
                            key={link.id}
                            className="bg-white bg-opacity-80 cursor-pointer text-gray-800 py-3 px-4 rounded-md text-center"
                          >
                            {link.title}
                          </div>
                        ))}
                      </div>
                      {/* Social Icons */}
                      <div className="flex gap-3 mb-6">
                        {socialLinks.map((link) => (
                          <div
                            onClick={() => window.open(link.url, "_blank")}
                            key={link.id}
                            className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center"
                          >
                            <SocialIcon platform={link.platform} />
                          </div>
                        ))}
                      </div>
                      
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setIsBackgroundDialogOpen(true)}
                        >
                          <Image className="mr-2 h-4 w-4" />
                          Edit background
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setIsSocialDialogOpen(true)}
                        >
                          <UserRound className="mr-2 h-4 w-4" />
                          Edit social icons
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Views</span>
                      <span className="font-medium">{page.views || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Link Clicks</span>
                      <span className="font-medium">{totalLinkClicks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Dialogs */}
      <SocialLinksDialog
        open={isSocialDialogOpen}
        onOpenChange={setIsSocialDialogOpen}
        socialLinks={socialLinks}
        onSocialLinksChange={setSocialLinks}
      />

      <BackgroundImageDialog
        open={isBackgroundDialogOpen}
        onOpenChange={setIsBackgroundDialogOpen}
        backgroundImage={backgroundImage}
        onBackgroundImageChange={setBackgroundImage}
      />
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        slug={slug}
        // here send slug please lo  katraj
        isDefault={isDefault}
        username={username.replace(/\s+/g, "").toLowerCase()}
      />
    </div>
  );
};

export default EditPage;
