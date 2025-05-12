import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/Animations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import queryString from "query-string";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Github, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
const API_URL=import.meta.env.VITE_API_URL;
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (queryParams.error) {
      setError(
        typeof queryParams.error === "string"
          ? decodeURIComponent(queryParams.error)
          : null
      ); // Decode the URL-encoded message
    }
  }, [location]);
  const handleGithubLogin = () => {
    window.location.assign(`${API_URL}/api/user/auth/github`);
  };
  const handleGoogleLogin = () => {

    
    window.location.assign(`${API_URL}/api/user/auth/google`);
  };


  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);

    try {
      const response = await axios.post(
        `${API_URL}/api/user/register`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Signup successful:", response.data);
      toast({
        title: "Account created!",
        description: "We've created your account for you.",
      });

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     toast({
  //       title: "Account created!",
  //       description: "We've created your account for you.",
  //     });
  //     setIsLoading(false);
  //   }, 2000);

  //   console.log(values);
  // }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <Button
            variant="outline"
            size="sm"
            className="mb-2 w-full border-dashed border-destructive text-destructive hover:bg-destructive/10"
            // onClick={simulateError}
          >
            {error}
          </Button>
        </div>
      )}

      <div className="container max-w-md mx-auto py-16 px-4 flex-1 flex items-center justify-center">
        <FadeIn className="w-full">
          <Link
            to="/"
            className="inline-flex items-center mb-6 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <Card className="w-full border border-border/50 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <span className="text-2xl font-semibold text-primary flex items-center">
                  <span className="text-gradient">Link</span>
                  <span>Free</span>
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Get started with your free LinkFree account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none">
                            I agree to the{" "}
                            <Link to="#" className="text-accent underline">
                              terms of service
                            </Link>{" "}
                            and{" "}
                            <Link to="#" className="text-accent underline">
                              privacy policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  type="button"
                  onClick={handleGithubLogin}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-accent font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default Signup;
