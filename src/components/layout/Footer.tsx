import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: "Local SEO", href: "/#services" },
      { label: "Web SEO", href: "/#services" },
      { label: "E-commerce SEO", href: "/#services" },
    ],
    company: [
      { label: "About Us", href: "/#home" },
      { label: "Process", href: "/#process" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQ", href: "/#faq" },
    ],
    resources: [
      { label: "Free Audit", href: "/#contact" },
      { label: "Contact Us", href: "/#contact" },
    ],
  };
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <img
                src={logo}
                alt="AGSEO Logo"
                width="40"
                height="40"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="font-heading font-bold text-xl text-foreground">
                AG<span className="text-primary">SEO</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              {t("footer.description")}
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hello@agseo.pro"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@agseo.pro
              </a>
              <a
                href="tel:+447455401962"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +44 7455 401962
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Amzei Square, Bucharest
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t("nav.services")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AGSEO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
}
