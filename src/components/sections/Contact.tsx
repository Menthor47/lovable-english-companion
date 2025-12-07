import { MessageCircle, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Boost Your{" "}
              <span className="gradient-text">Digital Presence?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contact us today for a free consultation and discover how we can
              help you achieve your goals.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* WhatsApp Card */}
            <div className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
              
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                Let's Talk on WhatsApp!
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Get immediate answers to all your questions. Our team is
                available to help you with your SEO and digital marketing
                project.
              </p>
              
              <Button
                variant="hero"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 shadow-green-500/20"
                asChild
              >
                <a
                  href="https://wa.me/1234567890?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20your%20SEO%20and%20digital%20marketing%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp
                </a>
              </Button>
              
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Business hours: Mon-Fri 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            {/* Email/Form Card */}
            <div className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Send className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                Request a Free Audit
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Our AI will analyze your website and provide actionable
                insights to improve your search rankings. No commitment
                required.
              </p>
              
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="url"
                  placeholder="Your website URL"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                />
                <Button variant="hero" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  Get Free Audit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
