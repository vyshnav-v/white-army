"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { CLUB, CONTACT, MILESTONES } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                W
              </div>
              <span className="text-xl font-bold text-foreground">
                White Army Arts &amp; Sports Club
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              {t("footer.tagline", { village: CLUB.village, years: String(MILESTONES.yearsOfService) })}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blood-donors"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.bloodDonors")}
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.digitalLibrary")}
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.jobBoard")}
                </Link>
              </li>
              <li>
                <Link
                  href="/workers"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.workersDirectory")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.newsEvents")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{CLUB.villageFull}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.phone}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-sm text-center text-muted-foreground">
          <p>{t("footer.copyright", { year: String(currentYear), clubName: CLUB.name, village: CLUB.village })}</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              {t("footer.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
