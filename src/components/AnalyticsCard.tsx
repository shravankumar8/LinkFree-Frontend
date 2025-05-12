import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define the types for the page data
interface Link {
  url: string;
  title: string;
  clicks: number;
}

interface Page {
  views: number;
  links: Link[];
}


const AnalyticsCard = ({ page }: { page: Page }) => {
  // Calculate total link clicks by summing the clicks from all links
  const totalLinkClicks = page.links.reduce(
    (total, link) => total + (link.clicks || 0),
    0
  );

  return (
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
  );
};

export default AnalyticsCard;
