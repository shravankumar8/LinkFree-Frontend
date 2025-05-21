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
import { useIsMobile } from "@/hooks/use-mobile";
const API_URL = import.meta.env.VITE_API_URL;



// Sub-component for when no pages exist
const DashboardNoPages = ({handleCreatePage}) => {

  return (
    <div>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl">
            Your Pages
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg">
            Create and manage your link pages
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              You haven't created any pages yet
            </p>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3"
              onClick={handleCreatePage}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Create Your First Page
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
  const [isEmpty, setIsEmpty] = useState(false); // Toggle this to see empty state
  const { toast } = useToast();
  const navigate = useNavigate();

  const isMobile = useIsMobile();


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
    return <DashboardNoPages handleCreatePage={handleCreatePage} />;
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
    <div className="bg-background h-full overflow-y-auto">
      <div className="container mx-auto py-4 px-2 sm:py-6 md:py-8 sm:px-4 max-w-3xl">
        <FadeIn>
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 md:p-8">
            <div className="flex flex-col space-y-2 mb-4 sm:mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <h1 className="text  text-2xl sm:text-3xl font-bold tracking-tight">
                  Your Pages
                </h1>
                <div>
                  <Button
                    size={isMobile ? "sm" : "lg"}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full md:w-auto px-4 sm:px-6"
                    onClick={handleCreatePage}
                  >
                    <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    New Page
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Create and manage your link pages
              </p>
            </div>

            {isEmpty || pages.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-300">
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
                <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center px-4">
                  You haven't created any pages yet
                </p>
                <Button
                  size={isMobile ? "sm" : "lg"}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-6 h-auto"
                  onClick={handleCreatePage}
                >
                  <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Create Your First Page
                </Button>
              </div>
            ) : (
              // Pages list - desktop uses table, mobile uses cards
              <div className="space-y-4">
                {/* Table for Desktop */}
                <div className="hidden sm:block">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page Name</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
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

                {/* Card Layout for Mobile */}
                <div className="block sm:hidden space-y-4">
                  {pages.map((page) => (
                    <Card key={page.id} className="border shadow-sm">
                      <CardContent className="p-4 flex flex-col space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">{page.slug}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPage(page.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {formatDateIntl(page.createdAt)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default DashboardPagesCard;
