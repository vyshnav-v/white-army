"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Users,
  Calendar,
  Shield,
  Target,
  ArrowLeft,
} from "lucide-react";
import { CLUB, MILESTONES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const startYear = new Date().getFullYear() - MILESTONES.yearsOfService;

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("about.backToHome")}
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {CLUB.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {CLUB.villageFull} {t("about.subtitle", { year: String(startYear) })}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("about.ourStory")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.ourStoryP1", { clubName: CLUB.name, years: String(MILESTONES.yearsOfService), village: CLUB.village })}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {t("about.ourStoryP2", { year: String(MILESTONES.registeredYear), village: CLUB.village })}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("about.ourValues")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t("about.ourValuesIntro")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{t("about.noPolitics")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("about.noPoliticsDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{t("about.noReligion")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("about.noReligionDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{t("about.unityDiversity")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("about.unityDiversityDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("about.ourMission")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.ourMissionP", { clubName: CLUB.name, village: CLUB.village })}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("about.keyMilestones")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t("about.established")}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t("about.establishedDesc", { years: String(MILESTONES.yearsOfService) })}
                    </p>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t("about.registered")}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t("about.registeredDesc", { year: String(MILESTONES.registeredYear) })}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          <div className="pt-8">
            <Link href="/auth/register">
              <Button size="lg" className="font-medium">
                {t("about.joinCommunity")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
