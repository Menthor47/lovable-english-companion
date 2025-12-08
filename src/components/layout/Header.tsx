import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
            to="/#home"
            className="flex items-center gap-2 group"
            onClick={() => handleNavClick("/#home")}
          >
            <div className="relative w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-colors">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              AG<span className="text-primary">SEO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Solutions */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary/20 p-6 no-underline outline-none focus:shadow-md"
                            to="/#services"
                            onClick={() => handleNavClick("/#services")}
                          >
                            <Sparkles className="h-6 w-6 text-primary mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              AG SEO
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              AEO + GEO + SEO. The complete formula for modern search dominance.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/#services" title="AEO & GEO">
                        Optimize for AI answers and generative engines.
                      </ListItem>
                      <ListItem href="/#services" title="Technical SEO">
                        Enterprise-grade ranking infrastructure.
                      </ListItem>
                      <ListItem href="/#services" title="Paid Media (Ads)">
                        High-ROAS campaigns on Google, Meta, & TikTok.
                      </ListItem>
                      <ListItem href="/#services" title="Content & Links">
                        Authority building and scalable content engines.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      <ListItem href="/tools" title="Tools Hub">
                        Free AI utilities to boost your workflow.
                      </ListItem>
                      <ListItem href="/tools/audit" title="Instant AI Audit">
                        Get a comprehensive site analysis in seconds.
                      </ListItem>
                      <ListItem href="/tools/roi-calculator" title="ROI Calculator">
                        Project your potential revenue growth.
                      </ListItem>
                      <ListItem href="/dashboard" title="Client Portal">
                        Live analytics and project tracking demo.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
                      <ListItem href="/case-studies" title="Case Studies">
                        See how we drove 300% growth for clients.
                      </ListItem>
                      <ListItem href="/compare" title="Tool Comparisons">
                        Unbiased battles between top AI tools.
                      </ListItem>
                      <ListItem href="/resources/glossary" title="SEO Glossary">
                        Master the terminology of modern search.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing (Direct Link) */}
                <NavigationMenuItem>
                  <Link to="/pricing">
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent"}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

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
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 py-6 overflow-y-auto max-h-[80vh]">
              <nav className="flex flex-col gap-4 px-4">
                <div className="font-semibold text-primary px-2">Solutions</div>
                <Link to="/#services" className="pl-4 text-sm text-muted-foreground" onClick={() => handleNavClick("/#services")}>Services</Link>
                <Link to="/industries/saas" className="pl-4 text-sm text-muted-foreground">Industries</Link>

                <div className="font-semibold text-primary px-2 mt-2">Products</div>
                <Link to="/tools" className="pl-4 text-sm text-muted-foreground">Free Tools</Link>
                <Link to="/tools/audit" className="pl-4 text-sm text-muted-foreground">AI Audit</Link>
                <Link to="/tools/roi-calculator" className="pl-4 text-sm text-muted-foreground">ROI Calculator</Link>

                <div className="font-semibold text-primary px-2 mt-2">Resources</div>
                <Link to="/case-studies" className="pl-4 text-sm text-muted-foreground">Case Studies</Link>
                <Link to="/compare" className="pl-4 text-sm text-muted-foreground">Comparisons</Link>
                <Link to="/resources/glossary" className="pl-4 text-sm text-muted-foreground">Glossary</Link>

                <Link to="/pricing" className="font-semibold text-foreground px-2 mt-2 hover:text-primary transition-colors">Pricing</Link>

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

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
