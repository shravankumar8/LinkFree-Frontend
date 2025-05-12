import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil, GripVertical, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

const LinksManagement: React.FC = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: "1",
      title: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "twitter",
      clicks: 123,
    },
    {
      id: "2",
      title: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: "instagram",
      clicks: 87,
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github",
      clicks: 45,
    },
  ]);

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
    toast({
      title: "Link deleted",
      description: "Your link has been removed successfully.",
    });
  };

  const handleAddNewLink = () => {
    toast({
      title: "Add link feature",
      description: "This would open a modal to add a new link.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Links</h1>
          <p className="text-muted-foreground mt-1">
            Add, edit or remove links from your profile.
          </p>
        </div>
        <Button
          onClick={handleAddNewLink}
          className="bg-gradient-primary text-white button-shine"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-40">
              <p className="text-muted-foreground mb-4">
                You haven't added any links yet
              </p>
              <Button onClick={handleAddNewLink} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Link
              </Button>
            </CardContent>
          </Card>
        ) : (
          links.map((link) => (
            <Card key={link.id} className="relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 cursor-move">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="ml-10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLink(link.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="truncate">
                    {link.url}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-sm">
                    <span className="font-medium">{link.clicks}</span>{" "}
                    <span className="text-muted-foreground">clicks</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LinksManagement;
