import React, { useEffect, useState } from "react";
import { FadeIn } from "@/components/Animations";
import { Button } from "@/components/ui/button";
import { Plus, Edit, MoreHorizontal, FileText, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { n } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

// Sample page data - in a real app this would come from an API or state
const API_URL = import.meta.env.VITE_API_URL;

const ListPages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false); // Toggle this to see empty state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${API_URL}/api/pages`, {
          withCredentials: true,
        });
        const data = response.data;

        setPages(Array.isArray(data) ? data : []); // Ensure pages is an array
      } catch (error) {
        console.error("Failed to fetch pages:", error);
        setPages([]); // Fallback to empty array on error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };


    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleEditPage = (id: number) => {
    toast({
      title: "Editing page",
      description: `Navigating to edit page ${id}`,
    });
    // In a real app, this would navigate to an edit page
    // navigate(`/edit-page/${id}`);
  };

  const handleDeletePage = (id: number) => {
    toast({
      title: "Page deleted",
      description: "The page has been deleted successfully",
    });
    setPages(pages.filter((page) => page.id !== id));
    if (pages.length === 1) {
      setIsEmpty(true);
    }
  };
function formatDateIntl(dateString) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date);
}
  const handleCreatePage = () => {
    if (!newPageTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a page title",
        variant: "destructive",
      });
      return;
    }

    const newPage = {
      id: Date.now(),
      title: newPageTitle,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPages([...pages, newPage]);
    setIsEmpty(false);
    setNewPageTitle("");
    setIsDialogOpen(false);

    toast({
      title: "Page created",
      description: "Your new page has been created successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Your Pages</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your link pages
              </p>
            </div>
            <Button
              onClick={() => {
                navigate(`create`);
              }}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Page
            </Button>
          </div>

          {isEmpty || pages.length === 0 ? (
            // Empty state
            <Card className="border border-dashed border-gray-300 bg-gray-50/50">
              <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                <div className="rounded-full bg-blue-50 p-4">
                  <FileText className="h-10 w-10 text-blue-500" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="text-xl font-semibold">
                    You don't have any pages yet
                  </h3>
                  <p className="text-gray-500">
                    Create your first page to share your links with the world.
                    It only takes a minute to get started.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 px-8"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Page
                </Button>
              </div>
            </Card>
          ) : (
            // Pages grid
            <div className="grid gap-6 sm:grid-cols-2">
              {pages.map((page) => (
                <Card
                  key={page.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    navigate(`/${page.username}`);
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                      {page.slug}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeletePage(page.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Created: {formatDateIntl(page.createdAt)} </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-page/${page.id}`);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default ListPages;
