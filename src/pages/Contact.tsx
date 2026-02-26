import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact as ContactSection } from "@/components/sections/Contact";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

const Contact = () => {
    const pageUrl = getAbsoluteUrl("/contact");

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>Contact Us | AGSEO - AI SEO Agency</title>
                <meta name="description" content="Get in touch with AGSEO for a free AI SEO audit. We are ready to help you dominate search rankings." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="Contact Us | AGSEO - AI SEO Agency" />
                <meta property="og:description" content="Get in touch with AGSEO for a free AI SEO audit. We are ready to help you dominate search rankings." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>

            <Header />

            <main id="main" className="flex-grow pt-20">
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
