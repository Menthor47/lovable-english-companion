import { useState, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Link, useLocation, type LinkProps } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.webp";
import { navigationConfig } from "@/config/navigation";

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") return;

    if (href.includes("#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => handleNavClick("/")}
          >
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationConfig.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:text-primary data-[state=open]:text-primary transition-colors">
                          {t(`nav.${item.title}`)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(
                            "grid gap-3 p-4 md:w-[400px]",
                            item.title === "solutions" ? "lg:w-[500px] lg:grid-cols-[.75fr_1fr]" : "md:grid-cols-2"
                          )}>
                            {item.title === "solutions" && (
                              <li className="row-span-4">
                                <NavigationMenuLink asChild>
                                  <Link
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary/20 p-6 no-underline outline-none focus:shadow-md"
                                    to="/#services"
                                    onClick={() => handleNavClick("/#services")}
                                  >
                                    <Sparkles className="h-6 w-6 text-primary mb-2" />
                                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                                      {t("nav.solutionsMenu.badge")}
                                    </div>
                                    <p className="text-sm leading-tight text-white/90">
                                      {t("nav.solutionsMenu.description")}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            )}
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                href={subItem.href}
                                title={t(`nav.${item.title}Menu.${subItem.title}`)}
                              >
                                {item.title === "solutions" // Solution descriptions use translation keys
                                  ? t(`services.${subItem.description?.includes("Geo") ? "geo" : subItem.title === "technical" ? "seo" : subItem.title === "paid" ? "ads" : "content"}.description`)
                                  : subItem.description // Others use direct strings from config (or should effectively be translated, but preserving current behavior for now)
                                }
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link to={item.href}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent hover:text-primary hover:bg-primary/10 transition-colors"}>
                          {t(`nav.${item.title}`)}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="hero" size="sm" asChild>
              <Link to="/#contact" onClick={() => handleNavClick("/#contact")}>
                {t("hero.cta.primary")}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 py-6 overflow-y-auto max-h-[80vh]">
              <nav className="flex flex-col gap-4 px-4">
                {navigationConfig.map((item) => (
                  <div key={item.title}>
                    {item.items ? (
                      <>
                        <div className="font-semibold text-primary px-2">{t(`nav.${item.title}`)}</div>
                        <div className="flex flex-col mt-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="pl-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              onClick={() => handleNavClick(subItem.href)}
                            >
                              {t(`nav.${item.title}Menu.${subItem.title}`)}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="font-semibold text-foreground px-2 mt-2 hover:text-primary transition-colors block"
                        onClick={() => handleNavClick(item.href)}
                      >
                        {t(`nav.${item.title}`)}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                  <div className="flex justify-center py-2">
                    <LanguageSwitcher />
                  </div>
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/#contact" onClick={() => handleNavClick("/#contact")}>
                      {t("hero.cta.primary")}
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

type ListItemProps = Omit<LinkProps, "to"> & {
  href: string;
  title: string;
  children: ReactNode;
};

const ListItem = ({ className, title, children, href, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
