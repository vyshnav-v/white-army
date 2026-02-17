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
import { Droplet, Phone, Mail, Plus, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { BloodDonorRow } from "@/types/database";

const bloodGroupColors: Record<string, string> = {
  "A+": "bg-red-600 dark:bg-red-700 text-white border-red-700 dark:border-red-600",
  "A-": "bg-red-600 dark:bg-red-700 text-white border-red-700 dark:border-red-600",
  "B+": "bg-blue-600 dark:bg-blue-700 text-white border-blue-700 dark:border-blue-600",
  "B-": "bg-blue-600 dark:bg-blue-700 text-white border-blue-700 dark:border-blue-600",
  "AB+":
    "bg-purple-600 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-600",
  "AB-":
    "bg-purple-600 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-600",
  "O+": "bg-green-600 dark:bg-green-700 text-white border-green-700 dark:border-green-600",
  "O-": "bg-green-600 dark:bg-green-700 text-white border-green-700 dark:border-green-600",
};

export default async function BloodDonorsPage() {
  const supabase = await createClient();

  // Fetch blood donors with profile information
  const { data: donors, error } = await supabase
    .from("blood_donors")
    .select(
      `
      *,
      profiles:user_id (
        full_name,
        phone,
        email
      )
    `
    )
    .eq("is_public", true)
    .order("blood_group", { ascending: true });

  // Group donors by blood group
  type DonorWithProfile = BloodDonorRow & {
    profiles: {
      full_name: string | null;
      phone: string | null;
      email: string | null;
    } | null;
  };
  const typedDonors = (donors ?? []) as DonorWithProfile[];
  const donorsByBloodGroup = typedDonors.reduce(
    (acc, donor) => {
      if (!acc[donor.blood_group]) {
        acc[donor.blood_group] = [];
      }
      acc[donor.blood_group].push(donor);
      return acc;
    },
    {} as Record<string, DonorWithProfile[]>
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <Droplet className="h-10 w-10 text-red-600 dark:text-red-500" />
                Blood Donor Directory
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Find blood donors in your village during emergencies
              </p>
            </div>
            <Link href="/blood-donors/register">
              <Button size="lg" variant="outline">
                <Plus className="h-5 w-5 mr-2" />
                Register as Donor
              </Button>
            </Link>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800 dark:text-red-300">
              <p className="font-semibold">Emergency?</p>
              <p>
                Please contact donors directly via phone for immediate
                assistance. Always verify blood group and availability before
                proceeding.
              </p>
            </div>
          </div>
        </div>

        {/* Blood Group Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {bloodGroups.map((group) => {
            const count =
              donorsByBloodGroup[group]?.filter((d) => d.is_available).length ??
              0;
            return (
              <Card key={group} className={bloodGroupColors[group]}>
                <CardHeader className="p-4 text-center">
                  <CardTitle className="text-2xl font-bold">{group}</CardTitle>
                  <CardDescription className="text-sm font-medium">
                    {count} {count === 1 ? "donor" : "donors"}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Donors List */}
        {error ? (
          <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-400">
                Error Loading Donors
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-500">
                {error.message}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : !donors || donors.length === 0 ? (
          <Card>
            <CardHeader className="text-center py-12">
              <Droplet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-2xl">No Donors Yet</CardTitle>
              <CardDescription className="text-lg">
                Be the first to register as a blood donor and help save lives
              </CardDescription>
              <div className="mt-6">
                <Link href="/blood-donors/register">
                  <Button size="lg" variant="outline">
                    <Plus className="h-5 w-5 mr-2" />
                    Register Now
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {bloodGroups.map((bloodGroup) => {
              const groupDonors = donorsByBloodGroup?.[bloodGroup] || [];
              if (groupDonors.length === 0) return null;

              return (
                <div key={bloodGroup}>
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span
                      className={`px-4 py-2 rounded-lg font-bold shadow-md ${bloodGroupColors[bloodGroup]}`}
                    >
                      {bloodGroup}
                    </span>
                    <span className="text-muted-foreground text-lg">
                      ({groupDonors.length}{" "}
                      {groupDonors.length === 1 ? "donor" : "donors"})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupDonors.map((donor: DonorWithProfile) => (
                      <Card
                        key={donor.id}
                        className={`${!donor.is_available ? "opacity-60" : ""}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                {donor.profiles?.full_name || "Anonymous"}
                              </CardTitle>
                              <div className="mt-2 flex gap-2">
                                <Badge
                                  className={
                                    bloodGroupColors[donor.blood_group]
                                  }
                                >
                                  {donor.blood_group}
                                </Badge>
                                <Badge
                                  variant={
                                    donor.is_available ? "success" : "secondary"
                                  }
                                >
                                  {donor.is_available
                                    ? "Available"
                                    : "Not Available"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {donor.contact_preference !== "email" &&
                            donor.profiles?.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <a
                                  href={`tel:${donor.profiles.phone}`}
                                  className="text-primary hover:underline"
                                >
                                  {donor.profiles.phone}
                                </a>
                              </div>
                            )}
                          {donor.contact_preference !== "phone" &&
                            donor.profiles?.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <a
                                  href={`mailto:${donor.profiles.email}`}
                                  className="text-primary hover:underline truncate"
                                >
                                  {donor.profiles.email}
                                </a>
                              </div>
                            )}
                          {donor.last_donation_date && (
                            <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                              Last donation:{" "}
                              {new Date(
                                donor.last_donation_date
                              ).toLocaleDateString("en-IN")}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
