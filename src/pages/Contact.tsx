import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact as ContactSection } from "@/components/sections/Contact";
import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>Contact Us | AGSEO - AI SEO Agency</title>
                <meta name="description" content="Get in touch with AGSEO for a free AI SEO audit. We are ready to help you dominate search rankings." />
            </Helmet>

            <Header />

            <main className="flex-grow pt-20">
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
