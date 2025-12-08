import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Tools from "@/pages/Tools";
import Audit from "@/pages/Audit";
import Dashboard from "@/pages/Dashboard";
import CaseStudies from "@/pages/CaseStudies";
import Glossary from "@/pages/Glossary";
import ContentService from "@/pages/ContentService";
import ROICalculator from "@/pages/ROICalculator";
import Pricing from "@/pages/Pricing";
import IndustryTemplate from "@/pages/IndustryTemplate";
import GEO from "@/pages/GEO";
import CookiePolicy from "@/pages/CookiePolicy";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";

import CompareHub from "@/pages/CompareHub";
import CompareDetail from "@/pages/CompareDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";

export function AnimatedRoutes() {
    const location = useLocation();
    useScrollToAnchor();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Index />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/audit" element={<Audit />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/resources/glossary" element={<Glossary />} />
                <Route path="/services/content" element={<ContentService />} />
                <Route path="/tools/roi-calculator" element={<ROICalculator />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/industries/:slug" element={<IndustryTemplate />} />
                <Route path="/compare" element={<CompareHub />} />
                <Route path="/compare/:slug" element={<CompareDetail />} />
                <Route path="/geo-optimization" element={<GEO />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}
