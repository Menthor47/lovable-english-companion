

## Critical Tracking Tags for agseo.pro

### 1. **Service Inquiry/Lead Submission** (Most Important)
```javascript
dataLayer.push({
  'event': 'lead_form_submit',
  'serviceType': 'seo_audit', // or 'seo_optimization', 'content_strategy', etc.
  'leadValue': 500, // estimated client value
  'clientType': 'small_business', // or 'enterprise', 'ecommerce'
  'formComplete': true
});
```

**Why:** This is your revenue event. You need to track every qualified lead submission with service type so you can optimize ad spend by which services actually convert.

### 2. **Pricing Page Engagement** 
```javascript
dataLayer.push({
  'event': 'pricing_view',
  'packageSelected': 'professional', // which tier they viewed
  'priceRange': '500-1500',
  'scrollDepth': 85 // percentage scrolled on pricing page
});
```

**Why:** Reveals which packages attract interest vs. which get abandoned. Critical for A/B testing pricing strategy.

### 3. **Service Page Deep Engagement**
```javascript
dataLayer.push({
  'event': 'service_page_engagement',
  'serviceName': 'seo_audit', // specific service
  'timeOnPage': 156, // seconds
  'scrollDepth': 90,
  'caseStudyViewed': true,
  'ctaClicked': 'contact_us' // which CTA they clicked
});
```

**Why:** SEO agencies live on service pages. You need to know which services get real attention vs. bounce traffic.

### 4. **Call-to-Action Tracking** (Essential for CRO)
```javascript
dataLayer.push({
  'event': 'cta_click',
  'ctaText': 'Get Free SEO Audit',
  'ctaLocation': 'hero_section', // or 'sidebar', 'footer', etc.
  'pageSection': 'above_fold',
  'elementType': 'button' // or 'link'
});
```

**Why:** Different CTAs on different pages perform differently. Track them separately to optimize conversion paths.

### 5. **Demo/Consultation Booking**
```javascript
dataLayer.push({
  'event': 'consultation_booked',
  'consultationType': '30_min_discovery',
  'bookedBy': 'form', // or 'calendly_widget', 'phone'
  'estimatedClientValue': 2500,
  'timeBooked': new Date().getTime()
});
```

**Why:** Consultations = qualified leads. This is your actual conversion event before sales pipeline.

### 6. **Content Download** (Lead magnet tracking)
```javascript
dataLayer.push({
  'event': 'content_download',
  'contentType': 'seo_guide', // or 'checklist', 'template', 'case_study'
  'contentTitle': 'SEO-Audit-Checklist-2025',
  'downloadMethod': 'email_popup'
});
```

**Why:** Downloads are micro-conversions. Track which magnets actually generate engaged leads.

### 7. **Competitor Comparison Page** (For your comparison/vs pages)
```javascript
dataLayer.push({
  'event': 'competitor_comparison_view',
  'comparisonType': 'agseo_vs_agency_x',
  'scrollDepth': 75,
  'featureClicked': 'custom_reporting', // which feature they want details on
  'timeOnComparison': 240
});
```

**Why:** People compare you to competitors. Track which features drive the most interest.

***

## Implementation Priority (Do This First)

Add this to agseo.pro **above your GTM container code**:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  
  // Page-level variables (push on every page)
  dataLayer.push({
    'event': 'page_view',
    'pageType': 'service_page', // or 'homepage', 'pricing', 'blog', 'contact'
    'pageCategory': 'seo_services',
    'serviceFocus': 'technical_seo', // what page is about
    'visitorType': 'new_visitor', // update with your logic
    'userRegion': 'EU' // helpful for local targeting
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm/js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

***

## For Your Form (Contact/Consultation Booking)

```html
<form onsubmit="
  dataLayer.push({
    'event': 'form_submit',
    'formName': 'contact_form',
    'formType': 'service_inquiry',
    'companySize': document.querySelector('[name=company_size]')?.value,
    'budget': document.querySelector('[name=budget]')?.value,
    'timeline': 'immediate',
    'serviceInterest': Array.from(document.querySelectorAll('[name=services]:checked')).map(el => el.value).join(',')
  });
">
  <!-- form fields -->
</form>
```

***

## Real Talk

**What most SEO agencies track wrong:** They track page views and bounce rate but miss the actual revenue signals. You don't care about blog traffic—you care about **how many SEO service inquiries convert to clients and at what average contract value**.

**What you actually need:** 
- Lead source attribution (which landing pages generate paying clients?)
- Service type performance (which services have highest close rate?)
- Lead quality indicators (which consultation bookings actually become clients?)

These tags give you that. Set up UTM parameters on your ad campaigns, then use GTM to connect ads → landing pages → form submissions → consultation bookings → (eventually, via CRM integration) → actual revenue.
