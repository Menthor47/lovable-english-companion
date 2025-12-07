const partners = [
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Google Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" },
  { name: "SEMRush", logo: "https://www.semrush.com/static/index/semrush-logo.svg" },
  { name: "Ahrefs", logo: "https://static.ahrefs.com/static/assets/ahrefs-logo-dark.svg" },
  { name: "Moz", logo: "https://moz.com/images/logo.svg" },
  { name: "HubSpot", logo: "https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-logo.svg" },
];

export function Partners() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30">
      <div className="absolute inset-0 bg-secondary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Certified Technology Partners
        </p>
        
        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-12 w-32 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <div className="text-muted-foreground font-heading font-semibold text-lg">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
