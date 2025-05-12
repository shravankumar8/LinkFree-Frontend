import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Upload,
  Loader2,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
const usernameschema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(30, { message: "Username must be atmost 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
});

const displayNameSchema = z.object({
  displayName: z
    .string()
    .min(3, { message: "Display name must be atleast 3 characters long" })
    .max(50, { message: "Display name must be atmost 50 characters long" }),
});

const profilePictureSchema = z.object({
  profilePicture: z
    .any()
    .refine((file) => file instanceof File, "Please upload a valid image file"),
});
const bioSchema = z.object({
  bio: z
    .string()
    .max(150, { message: "Bio must not exceed 150 characters" })
    .optional()
    .or(z.literal("")),
});
const profileSchema = usernameschema
  .merge(displayNameSchema)
  .merge(profilePictureSchema)
  .merge(bioSchema);
type Step = "username" | "displayName" | "profilePicture" | "bio" | "complete";

const ProfileSetupWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState<Step>("username");
  const [loading, setLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [userData, setUserData] = useState({
    username: "",
    displayName: "",
    profilePicture: "",
    bio: "",
  });
  const { user } = useContext(AuthContext);
  const usernameForm = useForm<z.infer<typeof usernameschema>>({
    resolver: zodResolver(usernameschema),
    defaultValues: {
      username: userData.username,
    },
  });

  useEffect(() => {
    // Check isSetupComplete on mount
    if (user?.isSetupComplete) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const displayNameForm = useForm<z.infer<typeof displayNameSchema>>({
    defaultValues: {
      displayName: userData.displayName,
    },
  });

  const bioForm = useForm<z.infer<typeof bioSchema>>({
    defaultValues: {
      bio: userData.bio,
    },
  });
  const profilePictureForm = useForm({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      profilePicture: null,
    },
  });

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a JPEG or PNG image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      profilePictureForm.setValue("profilePicture", file);
      setError(null);
    }
  };

  const handleProfilePictureSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profilePicture", data.profilePicture);

    try {
      const response = await axios.post(
        `${API_URL}/api/user/profile-picture`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const profilePictureUrl  = response.data.url;

      setUserData((prev) => ({ ...prev, profilePicture: profilePictureUrl }));
      setCurrentStep("bio");
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const checkUserName = async (username: string) => {
    setIsCheckingUsername(true);
    const response = await axios.post(
      `${API_URL}/api/profile/check-username`,
      { username }
    );
    if (response.data.available) {
      setIsCheckingUsername(false);
      return true;
    } else {
      setIsCheckingUsername(false);
      return false;
    }
  };
  const handleUsernameSubmit = async (data: z.infer<typeof usernameschema>) => {
    const isAvailable = await checkUserName(data.username);

    if (isAvailable) {
      setUserData((prev) => ({ ...prev, username: data.username }));
      setCurrentStep("displayName");
      toast({
        title: "username available",
        description: `@${data.username} is yours buddy `,
      });
    } else {
      usernameForm.setError("username", {
        type: "manual",
        message: "Username is already taken",
      });
    }
  };

  const handleDisplayNameSubmit = (data: z.infer<typeof displayNameSchema>) => {
    setUserData((prev) => ({ ...prev, displayName: data.displayName }));
    setCurrentStep("profilePicture");
  };

  const handleBioSubmit = (data: z.infer<typeof bioSchema>) => {
    setUserData((prev) => ({ ...prev, bio: data.bio }));
    setCurrentStep("complete");
  };
  // here you do the aactually call to put the data into teh backend shit
  const handleCompleteSetup = async () => {
    // /here we need to do the final submissiion call and shit
    setLoading(true);
    if (!userData.username || !userData.displayName) {
      setError("Username and Display Name are required.");
      setLoading(false);
      return;
    }
    // data iis available as userData
    try {
      const response = await axios.post(
        `${API_URL}/api/profile/setup`,
        {
          username: userData.username,
          displayName: userData.displayName,
          profilePic: userData.profilePicture,
          bio: userData.bio || "",
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message !== "Profile setup complete") {
        throw new Error("Unexpected response from server");
      }
      toast({
        title: "Profile setup complete",
        description: "Welcome to LinkFree! Let’s get started.",
      });
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during setup:", error);
      setError(
        error.response?.data?.error ||
          "Something went wrong while saving your profile. Please try again."
      );
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // okay if the user click on next this shit just skuios to the next step so easy peasy
    if (currentStep === "profilePicture") {
      setCurrentStep("bio");
    } else if (currentStep === "bio") {
      setCurrentStep("complete");
    }
  };

  const handleBack = () => {
    if (currentStep === "displayName") {
      setCurrentStep("username");
    } else if (currentStep === "profilePicture") {
      setCurrentStep("displayName");
    } else if (currentStep === "bio") {
      setCurrentStep("profilePicture");
    } else if (currentStep === "complete") {
      setCurrentStep("bio");
    }
  };

  const variants = {
    enter: {
      y: 10,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };

  const renderStepIndicator = () => {
    const steps = ["username", "displayName", "profilePicture", "bio"] as const;
    const stepIndex = steps.indexOf(currentStep as Exclude<Step, "complete">);

    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {steps.reduce((acc, step, index) => {
          acc.push(
            <div
              key={`dot-${step}`}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index <= stepIndex ? "bg-accent" : "bg-muted"
              }`}
            />
          );
          if (index < steps.length - 1) {
            acc.push(
              <div
                key={`line-${step}`}
                className="w-6 h-0.5 bg-slate-400 bg-muted"
              />
            );
          }
          return acc;
        }, [] as JSX.Element[])}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
      </div>

      <div className="container max-w-lg mx-auto py-10 px-4 flex-1 flex items-center justify-center">
        <Card className="w-full border border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <span className="text-2xl font-semibold text-primary flex items-center">
                <span className="text-gradient">Link</span>
                <span>Free</span>
              </span>
            </div>
            {renderStepIndicator()}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                {currentStep === "username" && (
                  <>
                    <CardTitle className="text-2xl font-bold">
                      Choose your username
                    </CardTitle>
                    <CardDescription>
                      This will be your unique profile URL
                    </CardDescription>
                  </>
                )}
                {currentStep === "displayName" && (
                  <>
                    <CardTitle className="text-2xl font-bold">
                      Set your display name
                    </CardTitle>
                    <CardDescription>
                      How others will see you on LinkFree
                    </CardDescription>
                  </>
                )}
                {currentStep === "profilePicture" && (
                  <>
                    <CardTitle className="text-2xl font-bold">
                      Add a profile picture
                    </CardTitle>
                    <CardDescription>
                      Optional: Upload an image URL for your profile
                    </CardDescription>
                  </>
                )}
                {currentStep === "bio" && (
                  <>
                    <CardTitle className="text-2xl font-bold">
                      Write a short bio
                    </CardTitle>
                    <CardDescription>
                      Optional: Tell others a bit about yourself
                    </CardDescription>
                  </>
                )}
                {currentStep === "complete" && (
                  <>
                    <CardTitle className="text-2xl font-bold">
                      Ready to go!
                    </CardTitle>
                    <CardDescription>
                      Your profile is ready to be created
                    </CardDescription>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {currentStep === "username" && (
                  <Form {...usernameForm}>
                    <form
                      onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={usernameForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <span className="text-muted-foreground mr-1">
                                  linkfree.com/
                                </span>
                                <Input
                                  placeholder="johnny123"
                                  autoFocus
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Choose a username that's easy to remember
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                        disabled={isCheckingUsername}
                      >
                        {isCheckingUsername ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Checking availability...
                          </>
                        ) : (
                          <>
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}

                {currentStep === "displayName" && (
                  <Form {...displayNameForm}>
                    <form
                      onSubmit={displayNameForm.handleSubmit(
                        handleDisplayNameSubmit
                      )}
                      className="space-y-6"
                    >
                      <FormField
                        control={displayNameForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                autoFocus
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is how your name will appear on your profile
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={handleBack}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {currentStep === "profilePicture" && (
                  <Form {...profilePictureForm}>
                    <form
                      onSubmit={profilePictureForm.handleSubmit(
                        handleProfilePictureSubmit
                      )}
                      className="space-y-6"
                    >
                      <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 border-2 border-border">
                          {previewImage ? (
                            <AvatarImage src={previewImage} alt="Profile" />
                          ) : (
                            <AvatarFallback className="bg-muted">
                              <User className="h-12 w-12 text-muted-foreground" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>

                      <FormField
                        control={profilePictureForm.control}
                        name="profilePicture"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="image/jpeg,image/png"
                                  onChange={(e) => {
                                    handleImageChange(e);
                                    field.onChange(e.target.files?.[0] || null);
                                    const file = e.target.files?.[0];
                                  }}
                                  autoFocus
                                  className=" block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload your profile picture
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={handleBack}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleSkip}
                        >
                          Skip
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                          disabled={loading}
                        >
                          {loading ? "Uploading..." : "Next"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {currentStep === "bio" && (
                  <Form {...bioForm}>
                    <form
                      onSubmit={bioForm.handleSubmit(handleBioSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={bioForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Web Developer | Sharing my projects"
                                className="resize-none"
                                maxLength={150}
                                rows={4}
                                autoFocus
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A short description about yourself (max 150 chars)
                              <span className="float-right text-xs">
                                {field.value?.length || 0}/150
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={handleBack}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleSkip}
                        >
                          Skip
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {currentStep === "complete" && (
                  <div className="space-y-6">
                    <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Username</span>
                        <span className="text-sm font-semibold">
                          @{userData.username}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Display Name
                        </span>
                        <span className="text-sm font-semibold">
                          {userData.displayName}
                        </span>
                      </div>

                      {userData.profilePicture && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Profile Picture
                          </span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={userData.profilePicture}
                              alt="Profile"
                            />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}

                      {userData.bio && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Bio</span>
                          <span className="text-sm text-right max-w-[200px] truncate">
                            {userData.bio}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleCompleteSetup}
                        className="flex-1 bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating profile...
                          </>
                        ) : (
                          <>
                            Complete Setup
                            <Check className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">
            <p>You can update these details later in your profile settings</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetupWizard;
