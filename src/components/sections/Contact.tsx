import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { MessageCircle, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { useContactForm, type ContactFormData } from "@/hooks/useContactForm";
import { FormFeedback } from "@/components/ui/form-feedback";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "@/hooks/useAnalytics";

export function Contact() {
  const { t } = useTranslation();
  const { trackFormSubmit } = useAnalytics();
  const { register, handleSubmit, errors, isSubmitting, onSubmit, success, error } = useContactForm();

  const onFormSubmit = async (data: ContactFormData) => {
    const result = await onSubmit(data);
    if (result?.success) {
      trackFormSubmit("contact_form");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </AnimatedSection>

          {/* Contact Cards */}
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
            {/* WhatsApp Card */}
            <StaggerItem>
              <motion.div
                className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-green-500/50 transition-all group h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                  {t("contact.whatsapp.title")}
                </h3>

                <p className="text-muted-foreground mb-6">
                  {t("contact.whatsapp.description")}
                </p>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 shadow-green-500/20"
                  asChild
                >
                  <a
                    href={`https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("contact.whatsapp.button")}
                  </a>
                </Button>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{t("contact.whatsapp.hours")}</span>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Email/Form Card */}
            <StaggerItem>
              <motion.div
                className="p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Send className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                  {t("contact.form.title")}
                </h3>

                <p className="text-muted-foreground mb-6">
                  {t("contact.form.description")}
                </p>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">{t("contact.form.email")}</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary/50"} focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all`}
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive ml-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">{t("contact.form.website")}</label>
                    <input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.website ? "border-destructive focus:border-destructive" : "border-border focus:border-primary/50"} focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all`}
                      {...register("website")}
                      disabled={isSubmitting}
                    />
                    {errors.website && (
                      <p className="text-xs text-destructive ml-1">{errors.website.message}</p>
                    )}
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                  </Button>

                  <FormFeedback isLoading={false} error={error} success={success} />
                </form>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
