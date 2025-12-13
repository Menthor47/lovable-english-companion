import { useTranslation } from "react-i18next";
import { Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { footerLinks } from "@/config/navigation";
import { config } from "@/lib/config";

export function Footer() {
  const { t } = useTranslation();
  const email = config.contact.email;

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
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
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              {t("footer.description")}
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t(footerLinks.services.titleKey)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t(footerLinks.company.titleKey)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              {t(footerLinks.resources.titleKey)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
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
            {footerLinks.legal.links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
