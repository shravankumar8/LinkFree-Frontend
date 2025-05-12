import React, { useState } from "react";
import { FadeIn } from "@/components/Animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  HelpCircle,
  Book,
  PlayCircle,
  Activity,
  Mail,
  MessageSquare,
  Users,
  Info,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardHelp = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "Technical Issue",
    message: "",
    screenshot: null,
  });

  // FAQ data
  const faqs = [
    {
      question: "How do I customize my LinkFree profile?",
      answer:
        "You can customize your profile by adding links, changing your background image, and updating your bio in the dashboard.",
    },
    {
      question: "How do I see analytics for my profile?",
      answer:
        "Your profile analytics are shown on the dashboard, displaying total views and link clicks.",
    },
    {
      question: "Can I change my username?",
      answer:
        "Currently, usernames cannot be changed after account creation to ensure link permanence.",
    },
    {
      question: "How do I make my profile visible/invisible?",
      answer:
        "Toggle the visibility switch in the dashboard header to control your profile's public visibility.",
    },
    {
      question: "How do I share my profile?",
      answer:
        "Click the 'Share' button in the dashboard header to get a shareable link to your profile.",
    },
  ];

  // Knowledge base categories
  const categories = [
    {
      title: "Getting Started",
      icon: <Info className="h-6 w-6" />,
      description: "Account setup and first steps",
    },
    {
      title: "Profile Management",
      icon: <Users className="h-6 w-6" />,
      description: "Customize and manage your profile",
    },
    {
      title: "Links & Social",
      icon: <Book className="h-6 w-6" />,
      description: "Add and manage your links and social connections",
    },
    {
      title: "Analytics",
      icon: <Activity className="h-6 w-6" />,
      description: "Track views and engagement",
    },
    {
      title: "Troubleshooting",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Common issues and solutions",
    },
  ];

  // Video tutorials
  const tutorials = [
    {
      title: "Setting up your LinkFree profile",
      duration: "2:30",
      difficulty: "Beginner",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      title: "Customizing your background",
      duration: "1:45",
      difficulty: "Beginner",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      title: "Advanced link management",
      duration: "3:15",
      difficulty: "Intermediate",
      thumbnail: "https://via.placeholder.com/320x180",
    },
  ];

  // Handle support form submission
  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would send the data to your backend
    console.log("Support request submitted:", supportForm);

    toast({
      title: "Support request submitted",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setSupportForm({
      subject: "",
      category: "Technical Issue",
      message: "",
      screenshot: null,
    });
  };

  // Handle feedback submission
  const handleFeedback = (helpful: boolean) => {
    console.log("Feedback submitted:", helpful);
    setFeedbackSubmitted(true);

    toast({
      title: "Thank you for your feedback!",
      description: helpful
        ? "We're glad this was helpful."
        : "We'll work to improve our help resources.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <FadeIn>
          <div className="flex flex-col space-y-8">
            {/* Header */}
            <header>
              <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
              <p className="text-muted-foreground mt-1">
                Find answers and get support
              </p>
            </header>

            {/* Global Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Search help articles, FAQs, and guides..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Links & System Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                  <CardDescription>
                    Frequently asked questions and common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-4">
                    <Button variant="link" className="px-0">
                      Show all FAQs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <p>All systems operational</p>
                  </div>
                  <div className="text-sm mt-4">
                    <p className="font-medium">Latest update:</p>
                    <p className="text-muted-foreground">
                      May 10, 2025 - New theme options added
                    </p>
                  </div>
                  <Button variant="link" className="px-0 mt-2">
                    View status page
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Help Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Help Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-accent p-2">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {category.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                          <Button variant="link" className="px-0 mt-2">
                            View articles
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border"
                  >
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                        <PlayCircle className="h-12 w-12 text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center justify-between">
                        <span>{tutorial.duration}</span>
                        <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs">
                          {tutorial.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Support Tabs */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Get Support</h2>
              <Tabs defaultValue="contact">
                <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                  <TabsTrigger value="contact">Contact Support</TabsTrigger>
                  <TabsTrigger value="chat">Live Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="contact" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Support</CardTitle>
                      <CardDescription>
                        Submit a support request and we'll get back to you
                        within 24 hours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleSubmitSupport}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Subject
                          </label>
                          <Input
                            type="text"
                            value={supportForm.subject}
                            onChange={(e) =>
                              setSupportForm({
                                ...supportForm,
                                subject: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Category
                          </label>
                          <select
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                            value={supportForm.category}
                            onChange={(e) =>
                              setSupportForm({
                                ...supportForm,
                                category: e.target.value,
                              })
                            }
                          >
                            <option>Billing</option>
                            <option>Technical Issue</option>
                            <option>Feature Request</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Description
                          </label>
                          <Textarea
                            rows={6}
                            value={supportForm.message}
                            onChange={(e) =>
                              setSupportForm({
                                ...supportForm,
                                message: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Attach screenshot (optional)
                          </label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setSupportForm({
                                ...supportForm,
                                screenshot: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </div>
                        <Button type="submit" className="mt-4">
                          <Mail className="mr-2 h-4 w-4" />
                          Submit Request
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="chat" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Chat</CardTitle>
                      <CardDescription>
                        Chat with our support team or AI assistant
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">
                        Start a conversation
                      </h3>
                      <p className="text-center text-muted-foreground mb-6 max-w-md">
                        Get instant answers from our AI assistant or connect
                        with a human agent during business hours.
                      </p>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Chat
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Feedback Section */}
            <div className="border rounded-lg p-6 mt-8">
              <h2 className="text-xl font-medium mb-4">
                Was this help center useful?
              </h2>

              {!feedbackSubmitted ? (
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleFeedback(true)}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Yes, it was helpful
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFeedback(false)}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    No, I need more help
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Thank you for your feedback! We're constantly working to
                  improve our help resources.
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default DashboardHelp;
