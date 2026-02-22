import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { lazy } from "react";

// Dynamic imports for performance (Code Splitting)
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Tools = lazy(() => import("@/pages/Tools"));
const Audit = lazy(() => import("@/pages/Audit"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const Glossary = lazy(() => import("@/pages/Glossary"));
const ContentService = lazy(() => import("@/pages/ContentService"));
const ROICalculator = lazy(() => import("@/pages/ROICalculator"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const IndustryTemplate = lazy(() => import("@/pages/IndustryTemplate"));
const GEO = lazy(() => import("@/pages/GEO"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const CompareHub = lazy(() => import("@/pages/CompareHub"));
const CompareDetail = lazy(() => import("@/pages/CompareDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const PricingStarter = lazy(() => import("@/pages/PricingStarter"));
const PricingBusiness = lazy(() => import("@/pages/PricingBusiness"));
const PricingProBusiness = lazy(() => import("@/pages/PricingProBusiness"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Author = lazy(() => import("@/pages/Author"));
const SerpSimulator = lazy(() => import("@/pages/tools/SerpSimulator"));
const KeywordMixer = lazy(() => import("@/pages/tools/KeywordMixer"));
const SchemaGenerator = lazy(() => import("@/pages/tools/SchemaGenerator"));

export function AnimatedRoutes() {
    const location = useLocation();
    useScrollToAnchor();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Index />} />
                <Route path="/404" element={<NotFound />} />

                {/* Legacy URL aliases */}
                <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
                <Route path="/privacy-policy/" element={<Navigate to="/privacy" replace />} />

                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/audit" element={<Audit />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudy />} />
                <Route path="/resources/glossary" element={<Glossary />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/content" element={<ContentService />} />
                <Route path="/tools/roi-calculator" element={<ROICalculator />} />
                {/* New Functional Tools */}
                <Route path="/tools/serp-simulator" element={<SerpSimulator />} />
                <Route path="/tools/keyword-mixer" element={<KeywordMixer />} />
                <Route path="/tools/schema-generator" element={<SchemaGenerator />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/pricing/starter" element={<PricingStarter />} />
                <Route path="/pricing/business" element={<PricingBusiness />} />
                <Route path="/pricing/pro-business" element={<PricingProBusiness />} />
                <Route path="/industries/:slug" element={<IndustryTemplate />} />
                <Route path="/compare" element={<CompareHub />} />
                <Route path="/compare/:slug" element={<CompareDetail />} />
                <Route path="/geo-optimization" element={<GEO />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/authors/:id" element={<Author />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}
