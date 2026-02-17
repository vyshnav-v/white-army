import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Video className="h-10 w-10 text-warning" />
            Video Gallery
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Watch educational videos, cultural programs, and tutorials
          </p>
        </div>

        <Card className="text-center py-16">
          <CardHeader>
            <Video className="h-20 w-20 text-warning mx-auto mb-4" />
            <CardTitle className="text-3xl mb-2">Coming Soon</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              We&apos;re curating a collection of educational, cultural, and sports
              videos for the community. Coming soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
