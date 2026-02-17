import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Droplet, Mail, Phone, Calendar, Edit } from "lucide-react";
import Link from "next/link";
import type { ProfileRow, BloodDonorRow } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  // Fetch user profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch blood donor info if registered
  const { data: bloodDonorData } = await supabase
    .from("blood_donors")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const profile = profileData as ProfileRow | null;
  const bloodDonor = bloodDonorData as BloodDonorRow | null;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <User className="h-10 w-10 text-primary" />
            My Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your profile and community contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <Link href="/dashboard/edit">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="text-lg text-foreground">
                    {profile?.full_name || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Role
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        profile?.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {profile?.role || "member"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <p className="text-lg text-foreground">{profile?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  <p className="text-lg text-foreground">
                    {profile?.phone || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </label>
                  <p className="text-lg text-foreground">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Recently"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blood Donor Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-red-600 dark:text-red-500" />
                Blood Donor Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bloodDonor ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Blood Group
                    </label>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-500 mt-1">
                      {bloodDonor.blood_group}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Availability
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          bloodDonor.is_available ? "success" : "secondary"
                        }
                      >
                        {bloodDonor.is_available
                          ? "Available"
                          : "Not Available"}
                      </Badge>
                    </div>
                  </div>
                  {bloodDonor.last_donation_date && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Last Donation
                      </label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(
                          bloodDonor.last_donation_date
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Visibility
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={bloodDonor.is_public ? "default" : "secondary"}
                      >
                        {bloodDonor.is_public ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                  <Link href="/dashboard/blood-donor/edit">
                    <Button variant="outline" className="w-full" size="sm">
                      Update Donor Info
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Droplet className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    You&apos;re not registered as a blood donor yet
                  </p>
                  <Link href="/blood-donors/register">
                    <Button className="w-full">Register as Donor</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/blood-donors">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <Droplet className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Blood Donors</CardTitle>
                  <CardDescription>Find donors</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/news">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-8 w-8 text-blue-600 mx-auto mb-2">📰</div>
                  <CardTitle className="text-lg">News</CardTitle>
                  <CardDescription>Latest updates</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/library">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-8 w-8 text-green-600 mx-auto mb-2">📚</div>
                  <CardTitle className="text-lg">Library</CardTitle>
                  <CardDescription>Browse books</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/jobs">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-8 w-8 text-purple-600 mx-auto mb-2">💼</div>
                  <CardTitle className="text-lg">Jobs</CardTitle>
                  <CardDescription>Find opportunities</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
