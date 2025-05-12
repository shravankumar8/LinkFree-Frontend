import React, { useState } from "react";
import { FadeIn } from "@/components/Animations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
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
import { Link } from "react-router-dom";
import { ArrowLeft, Github, Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().optional(),
});

const notifySuccess = (message) => {
  return toast.success(message);
};
const notifyError = (message) => {
  return toast.error(message);
};


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });


  const handleGoogleLogin=()=>{
        window.location.assign(`${API_URL}/api/user/auth/google`);
  }
 const handleGithubLogin = () => {
   window.location.assign(`${API_URL}/api/user/auth/github`);
 };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      notifySuccess("signed in successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      notifyError("Invalid credentials or something is wrong ");
      setIsLoading(false);

    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-secondary opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-20 blur-3xl"></div>
      </div>

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
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Log in to your LinkFree account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium cursor-pointer">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Link
                      to="#"
                      className="text-sm text-accent font-medium hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all text-white button-shine mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Log in"
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
                  // onClick={handleGoogleLogin}
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
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-accent font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default Login;
