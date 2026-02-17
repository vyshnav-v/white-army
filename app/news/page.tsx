import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatRelativeTime } from "@/lib/utils";

type NewsItem = {
  id: string;
  title: string;
  image_url: string | null;
  category: string;
  published_at: string | null;
  content: string;
  excerpt: string | null;
  profiles: { full_name: string | null } | null;
};

const categoryColors: Record<string, string> = {
  announcement: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300",
  event:
    "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300",
  sports: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300",
  cultural: "bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300",
  general: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
};

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: news, error } = await supabase
    .from("news")
    .select(
      `
      *,
      profiles:author_id (
        full_name
      )
    `
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Newspaper className="h-10 w-10 text-primary" />
            News & Announcements
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Stay updated with the latest news and events from our community
          </p>
        </div>

        {/* News List */}
        {error ? (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">
                Error Loading News
              </CardTitle>
              <CardDescription className="text-destructive/80">
                {error.message}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : !news || news.length === 0 ? (
          <Card>
            <CardHeader className="text-center py-12">
              <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-2xl">No News Yet</CardTitle>
              <CardDescription className="text-lg">
                Check back later for updates and announcements
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(news as NewsItem[]).map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {item.image_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={
                          categoryColors[item.category] ||
                          categoryColors.general
                        }
                      >
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.published_at
                          ? formatRelativeTime(item.published_at)
                          : "Recently"}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      {item.title}
                    </CardTitle>
                    {item.excerpt && (
                      <CardDescription className="text-base line-clamp-3">
                        {item.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {item.profiles?.full_name || "Admin"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
