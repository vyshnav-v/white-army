import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Briefcase className="h-10 w-10 text-success" />
            Job Board
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover local job opportunities and career resources
          </p>
        </div>

        <Card className="text-center py-16">
          <CardHeader>
            <Briefcase className="h-20 w-20 text-success mx-auto mb-4" />
            <CardTitle className="text-3xl mb-2">Coming Soon</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              We&apos;re creating a job board to connect job seekers with local
              employment opportunities. Stay tuned!
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
