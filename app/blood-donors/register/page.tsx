"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegisterDonorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    blood_group: "",
    last_donation_date: "",
    contact_preference: "both",
    is_available: true,
    is_public: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      // Check if user is authenticated
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error("Please sign in to register as a blood donor");
        router.push("/auth/login?redirect=/blood-donors/register");
        return;
      }

      // Check if user already registered as donor
      const { data: existing } = await supabase
        .from("blood_donors")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existing) {
        toast.error("You are already registered as a blood donor");
        router.push("/dashboard");
        return;
      }

      // Register as blood donor (eslint-disable: Supabase client has strict generic types)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("blood_donors") as any).insert({
        user_id: user.id,
        blood_group: formData.blood_group,
        last_donation_date: formData.last_donation_date || null,
        contact_preference: formData.contact_preference,
        is_available: formData.is_available,
        is_public: formData.is_public,
      });

      if (error) throw error;

      toast.success("Successfully registered as a blood donor!");
      router.push("/blood-donors");
    } catch (error: unknown) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to register as blood donor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/blood-donors">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Donors
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center mb-4">
              <Droplet className="h-8 w-8 text-red-600 dark:text-red-500" />
            </div>
            <CardTitle className="text-3xl">Register as Blood Donor</CardTitle>
            <CardDescription className="text-base">
              Help save lives by registering as a blood donor in your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Blood Group <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {bloodGroups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, blood_group: group })
                      }
                      className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                        formData.blood_group === group
                          ? "border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                          : "border-border hover:border-muted-foreground bg-card text-foreground"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              {/* Last Donation Date */}
              <div>
                <label
                  htmlFor="last_donation_date"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Last Donation Date (Optional)
                </label>
                <Input
                  type="date"
                  id="last_donation_date"
                  value={formData.last_donation_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last_donation_date: e.target.value,
                    })
                  }
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Contact Preference */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Preference <span className="text-destructive">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: "phone", label: "Phone Only" },
                    { value: "email", label: "Email Only" },
                    { value: "both", label: "Both Phone & Email" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="contact_preference"
                        value={option.value}
                        checked={formData.contact_preference === option.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact_preference: e.target.value,
                          })
                        }
                        className="h-4 w-4 text-primary focus:ring-primary border-border"
                      />
                      <span className="ml-2 text-sm text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={formData.is_available}
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="is_available"
                  className="ml-2 text-sm text-foreground"
                >
                  I am currently available to donate blood
                </label>
              </div>

              {/* Public Visibility */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public}
                  onChange={(e) =>
                    setFormData({ ...formData, is_public: e.target.checked })
                  }
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="is_public"
                  className="ml-2 text-sm text-foreground"
                >
                  Make my information visible to everyone
                </label>
              </div>

              {/* Important Notice */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">
                  Important Information
                </h4>
                <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                  <li>You must be 18-65 years old and weigh at least 50kg</li>
                  <li>Wait at least 3 months between donations</li>
                  <li>
                    You can update your availability anytime from your dashboard
                  </li>
                  <li>
                    Your contact information will only be shared based on your
                    preference
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading || !formData.blood_group}
                >
                  {loading ? "Registering..." : "Register as Donor"}
                </Button>
                <Link href="/blood-donors" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
