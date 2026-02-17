"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Droplet,
  BookOpen,
  Briefcase,
  Users,
  Video,
  Newspaper,
  ArrowRight,
  Heart,
  Calendar,
  Trophy,
} from "lucide-react";
import { CLUB, MILESTONES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const featureKeys = [
  { key: "bloodDonors", icon: Droplet, href: "/blood-donors", color: "text-red-600", bgColor: "bg-red-50" },
  { key: "library", icon: BookOpen, href: "/library", color: "text-blue-600", bgColor: "bg-blue-50" },
  { key: "jobs", icon: Briefcase, href: "/jobs", color: "text-green-600", bgColor: "bg-green-50" },
  { key: "workers", icon: Users, href: "/workers", color: "text-purple-600", bgColor: "bg-purple-50" },
  { key: "videos", icon: Video, href: "/videos", color: "text-orange-600", bgColor: "bg-orange-50" },
  { key: "news", icon: Newspaper, href: "/news", color: "text-indigo-600", bgColor: "bg-indigo-50" },
] as const;

const statKeys = [
  { labelKey: "stats.activeMembers", value: "500+", icon: Users },
  { labelKey: "stats.bloodDonors", value: "50+", icon: Heart },
  { labelKey: "stats.eventsOrganized", value: "100+", icon: Calendar },
  { labelKey: "stats.sportsTournaments", value: "25+", icon: Trophy },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 drop-shadow-lg">
              {CLUB.name}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white max-w-3xl mx-auto drop-shadow-md">
              {CLUB.villageFull} {t("home.heroSubtitle", { years: String(MILESTONES.yearsOfService) })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base shadow-xl border-2 border-white"
                >
                  {t("home.joinCommunity")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blood-donors">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold text-base shadow-xl"
                >
                  <Droplet className="mr-2 h-5 w-5" />
                  {t("home.findBloodDonors")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-12 sm:py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {statKeys.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t(`home.${stat.labelKey}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t("home.featuresTitle")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.featuresSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((feature) => (
              <Link key={feature.key} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border">
                  <CardHeader>
                    <div
                      className={`inline-flex p-3 rounded-lg ${feature.bgColor} dark:bg-opacity-20 mb-4 w-fit`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{t(`home.features.${feature.key}.name`)}</CardTitle>
                    <CardDescription className="text-base">
                      {t(`home.features.${feature.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`flex items-center text-sm font-medium ${feature.color}`}
                    >
                      {t("home.explore")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("home.ctaTitle")}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t("home.ctaSubtitle", { shortName: CLUB.shortName, village: CLUB.village })}
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-white/15 dark:text-white dark:hover:bg-white/25 dark:border dark:border-white/30 font-semibold shadow-lg"
            >
              {t("home.getStarted")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("home.aboutTitle", { clubName: CLUB.name })}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("home.aboutIntro", { clubName: CLUB.name, village: CLUB.village, years: String(MILESTONES.yearsOfService) })}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("home.aboutPrinciple")}{" "}
                <strong className="text-foreground">{t("home.aboutPrincipleBold")}</strong>.
                {" "}{t("home.aboutPrincipleEnd", { village: CLUB.village })}
              </p>
              <Link href="/about">
                <Button variant="outline" size="lg" className="font-medium">
                  {t("home.learnMore")}
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-blue-600 dark:bg-blue-700 border-2 border-blue-700 dark:border-blue-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold text-white mb-2">
                    {MILESTONES.yearsOfService}+
                  </CardTitle>
                  <CardDescription className="text-blue-100 dark:text-blue-200 font-semibold text-base">
                    {t("home.yearsOfService")}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-green-600 dark:bg-green-700 border-2 border-green-700 dark:border-green-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold text-white mb-2">
                    {MILESTONES.registeredYear}
                  </CardTitle>
                  <CardDescription className="text-green-100 dark:text-green-200 font-semibold text-base">
                    {t("home.officiallyRegistered")}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-purple-600 dark:bg-purple-700 border-2 border-purple-700 dark:border-purple-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold text-white mb-2">
                    500+
                  </CardTitle>
                  <CardDescription className="text-purple-100 dark:text-purple-200 font-semibold text-base">
                    {t("home.activeMembers")}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-orange-600 dark:bg-orange-700 border-2 border-orange-700 dark:border-orange-600 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold text-white mb-2">
                    6+
                  </CardTitle>
                  <CardDescription className="text-orange-100 dark:text-orange-200 font-semibold text-base">
                    {t("home.keyServices")}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
