import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { FadeIn } from "@/components/Animations";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
// Sub-component for when no pages exist
const DashboardNoPages = () => {
  return (
    <div>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Your Pages</CardTitle>
          <CardDescription>Create and manage your link pages</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground mb-6">
              You haven't created any pages yet
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Your First Page {/* Fixed typo */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardPagesCard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true); // Fixed typo
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isEmpty, setIsEmpty] = useState(false); // Toggle this to see empty state

  const handleEditPage = (id: number) => {

    navigate(`/edit-page/${id}`);



  };

  const handleCreatePage = () => {
    navigate("pages/create");
    toast({
      title: "Creating new page",
      description: "Redirecting to page creation",
    });
    // In a real app, this would navigate to a creation page or open a modal
    // navigate('/create-page');

    // For demo purposes, let's add a new page to the list
    
  };

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

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Render no pages state
  if (pages.length === 0) {
    return <DashboardNoPages />;
  }
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

  // Render list of pages
  return (
    <div className=" bg-background max-h-[400px] overflow-scroll">
      <div className="container max-w-3xl   mx-auto py-8 px-4">
        <FadeIn>
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex flex-col space-y-2 mb-8">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                  Your Pages
                </h1>
                <div className="flex justify-center">
                  <Button

                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    onClick={handleCreatePage}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                     New Page
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                Create and manage your link pages
              </p>
            </div>

            {isEmpty || pages.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="w-20 h-20 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-gray-500 text-center">
                  You haven't created any pages yet
                </p>
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-6 h-auto"
                  onClick={handleCreatePage}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Page
                </Button>
              </div>
            ) : (
              // Pages list
              <div className="space-y-6 ">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page Name</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pages.map((page) => (
                          <TableRow key={page.id}>
                            <TableCell className="font-medium">
                              {page.slug}
                            </TableCell>
                            <TableCell>
                              {formatDateIntl(page.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditPage(page.id)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default DashboardPagesCard;
