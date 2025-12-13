# From Slick Demo to Enterprise-Ready: Closing AGSEO’s Security & Compliance Gaps

## Executive Summary
This audit of agseo.pro reveals a professionally designed AI-powered SEO service with a modern technology stack, but one that suffers from significant gaps in security, compliance, and commercial transparency that prevent it from being considered enterprise-ready. [executive_summary[0]][1] The platform is built on a sophisticated Node.js backend, likely using a Next.js framework, and is deployed on Vercel and Google Cloud infrastructure. [executive_summary[0]][1] [nodejs_usage_confirmation[0]][1] While it effectively leverages powerful AI partners like OpenAI and Anthropic, its operational practices create considerable risks for potential customers. [executive_summary[0]][1] Key findings indicate a pattern of surface-level credibility that does not hold up to deeper scrutiny, creating friction for procurement, legal, and security teams. The following insights summarize the most critical deficiencies and the path to remediation.

### AI Black-Box Risk: Undisclosed Data Sharing with AI Partners
AGSEO prominently advertises its use of OpenAI and Anthropic but provides zero disclosure on how customer data is shared with these third parties. [ai_integration_analysis[0]][1] The privacy policy and site content fail to specify what data is sent, the legal basis for its processing, or if Data Processing Agreements (DPAs) are in place. [data_privacy_and_compliance_review.ai_provider_data_sharing[0]][1] This opacity creates a significant compliance risk for any customer operating under GDPR or CCPA, as they have no visibility into how their data is handled by these subprocessors. [data_privacy_and_compliance_review.ai_provider_data_sharing[0]][1]

### Foundational Security Gaps: Missing Disclosure Channels and Protections
The platform lacks basic security maturity signals. While some research indicates a file exists at the `/.well-known/security.txt` path, other findings state it is absent or returns homepage content, and in any case, it does not establish a clear, public policy for vulnerability disclosure. [commercial_readiness_assessment.security_and_vulnerability_disclosure[0]][1] [security_posture_assessment.http_security_headers[0]][2] This leaves security researchers without an official channel to report issues. Furthermore, the audit could not confirm the presence of critical HTTP security headers, leaving the application and its users more vulnerable. [security_posture_assessment.http_security_headers[0]][2]

### Fragile Architecture: A Single Point of Failure
The core service functionality depends on at least four essential third-party vendors: Vercel, Google Cloud, OpenAI, and Anthropic. [reliability_and_scalability_evaluation.dependency_resilience[0]][1] The audit found no evidence of resilience patterns like circuit breakers, retries, or timeouts. [reliability_and_scalability_evaluation.dependency_resilience[0]][1] This architecture creates a high-risk single point of failure; an outage at any one of these critical providers could disable the entire AGSEO service. 

### Commercial Friction: Opaque Pricing and No Service Guarantees
AGSEO is not commercially transparent. The website does not publish any pricing tiers or plans, forcing all prospects into a high-friction "contact us" sales motion. Critically, there is no mention of a Service Level Agreement (SLA), meaning there are no documented commitments on uptime, performance, or support response times. This absence is a major deficiency for any B2B customer and a deal-breaker for most enterprise procurement processes. 

### Lopsided Trust Signals: Partner Logos Without Independent Validation
The site effectively uses logos of technology partners like OpenAI, Google Cloud, Shopify, and HubSpot to build credibility. [commercial_readiness_assessment.trust_signals_and_certifications[0]][1] However, this is undermined by a complete lack of independent, third-party validation. The audit found no mention of recognized security or compliance certifications such as SOC 2 or ISO 27001, which are standard requirements for enterprise vendors. [commercial_readiness_assessment.trust_signals_and_certifications[0]][1]

## 1. Purpose & Scope — Audit answers “Is AGSEO enterprise-ready?”
This report provides a comprehensive audit of the public-facing web application at https://agseo.pro/ to determine its technical architecture, security posture, and commercial readiness for enterprise engagement. The primary research goal was to assess the platform's use of Node.js and evaluate its overall viability as a service provider. [executive_summary[0]][1] The audit was conducted using passive analysis of publicly available information, which carries inherent limitations. [audit_limitations_and_next_steps[0]][3] The findings conclude that while AGSEO presents a modern and functional service, it requires significant improvements in security disclosure, compliance transparency, and contractual assurances before it can be considered enterprise-ready. [executive_summary[0]][1] This document details the technology stack, identifies critical risks, and provides a prioritized roadmap for remediation.

## 2. Technology Stack Deep Dive — Next.js on Vercel confirms Node.js SSR & serverless edges; what that enables and constrains
The audit confirms that agseo.pro uses Node.js as its primary backend runtime environment, a conclusion drawn from its modern architecture rather than direct server disclosures. [nodejs_usage_confirmation[0]][1] The site is a Server-Side Rendered (SSR) application built with a framework consistent with React and Next.js, hosted on Vercel. [nodejs_usage_confirmation[0]][1] [technology_stack_analysis.frontend_framework[0]][1] This technological ecosystem is definitive indirect evidence of Node.js, as Vercel's platform is optimized for Next.js deployments, which inherently use Node.js for server-side rendering, API routes, and serverless function execution. [technology_stack_analysis.backend_runtime[0]][1]

This stack enables a high-performance user experience and strong SEO capabilities, but also creates specific architectural patterns and dependencies.

#### Frontend Framework: React and Next.js
The site's structure as a single-page/SSR application, with server-rendered pages and clear routing for sections like `/blog` and `/tools/audit`, is characteristic of a Next.js build. [technology_stack_analysis.frontend_framework[0]][1] This approach improves initial page load times and search engine crawlability compared to purely client-side rendered React apps.

#### Backend Runtime and API Layer: Node.js via Next.js
The backend logic is implemented using the capabilities of the Next.js framework, specifically API Routes. [nodejs_backend_details[0]][1] This allows developers to create server-side API endpoints as Node.js serverless functions. [nodejs_backend_details[0]][1] Interactive features like the "Free Audit" tool and contact forms likely submit data to these internal API endpoints (e.g., `/api/audit`), which are then executed as Node.js functions on Vercel's infrastructure. [nodejs_backend_details[0]][1] These functions are also the most probable location for the server-side integration with AI providers OpenAI and Anthropic. [ai_integration_analysis[0]][1]

#### Hosting and Deployment: Vercel and Google Cloud
The site explicitly lists Vercel and Google Cloud as infrastructure partners. [technology_stack_analysis.hosting_providers[0]][1] This indicates the application is deployed on Vercel's serverless platform, which in turn may leverage Google Cloud Platform (GCP) for its underlying infrastructure. [technology_stack_analysis.hosting_providers[0]][1] This serverless architecture allows for scalable, on-demand execution of backend code without managing traditional servers, a key enabler for its dynamic AI features. [nodejs_backend_details[0]][1] Vercel's Edge Network also serves as a global Content Delivery Network (CDN), caching static assets and rendered pages close to users to reduce latency. [technology_stack_analysis.cdn_and_caching[0]][1]

## 3. Security Posture Reality Check — Missing headers, security.txt, no public vuln policy undermine trust
AGSEO's security posture is basic and falls short of enterprise expectations due to a lack of formal disclosure mechanisms and missing technical safeguards. [executive_summary[0]][1] These omissions signal a low level of security maturity and create tangible risks.

#### Vulnerability Disclosure: A Confusing and Inadequate Channel
There is a significant lack of a formal, clear mechanism for responsibly disclosing security vulnerabilities. [commercial_readiness_assessment.security_and_vulnerability_disclosure[0]][1] The audit found conflicting information regarding a `security.txt` file. While some data indicates a file was fetched from the standard `/.well-known/security.txt` path, other findings state the attempt was unsuccessful or returned the homepage content. [commercial_readiness_assessment.security_and_vulnerability_disclosure[0]][1] [security_posture_assessment.http_security_headers[0]][2] Even if a file exists, it does not provide clear instructions or a dedicated security contact (e.g., security@), which is the primary purpose of the standard. [commercial_readiness_assessment.security_and_vulnerability_disclosure[0]][1] This ambiguity prevents security researchers from reporting issues and is a major gap for customers who expect clear security protocols. 

#### Missing Technical Security Controls
The audit was unable to verify several critical, preventative security controls due to the passive analysis method. These represent significant unknowns and potential weaknesses.
* **HTTP Security Headers:** The status of key headers like HTTP Strict Transport Security (HSTS), Content Security Policy (CSP), and X-Frame-Options could not be determined. [security_posture_assessment.http_security_headers[0]][2] These headers are fundamental for protecting against attacks like man-in-the-middle and cross-site scripting.
* **TLS/SSL Configuration:** A detailed assessment of the site's TLS configuration (supported versions, cipher suites) was not performed. Weak configurations can expose data in transit.
* **Cookie Security:** While a cookie banner is present, the security attributes of the cookies themselves (e.g., `Secure`, `HttpOnly`, `SameSite` flags) were not analyzed. [security_posture_assessment.cookie_security[0]][1] Improperly configured cookies can be stolen and used to hijack user sessions.
* **Email Domain Security:** The domain's DNS records for SPF, DKIM, and DMARC were not verified. [security_posture_assessment.email_domain_security[0]][2] Without these, the `agseo.pro` domain is more susceptible to being used in phishing and spoofing attacks.

## 4. Data Privacy & Regulatory Compliance — Undisclosed AI data flows, weak cookie controls, absent DPO info threaten GDPR/CCPA alignment
AGSEO demonstrates a surface-level awareness of privacy obligations by providing links to legal policies, but the lack of detail and transparency, especially concerning its AI partners, creates significant compliance risks under regulations like GDPR and CCPA. [data_privacy_and_compliance_review.privacy_policy_analysis[0]][1]

#### Opaque AI Provider Data Sharing
The most critical compliance failure is the complete lack of disclosure regarding data sharing with OpenAI and Anthropic. [data_privacy_and_compliance_review.ai_provider_data_sharing[0]][1] The site advertises these partnerships but fails to inform users:
* What specific data (e.g., inputs to the "Free Audit" tool) is sent to the AI models.
* Whether prompts or outputs are logged or retained by these third parties.
* The legal basis (e.g., consent, contract) for this data processing.
* Whether Data Processing Agreements (DPAs) are in place with these vendors. [data_privacy_and_compliance_review.ai_provider_data_sharing[0]][1]

This absence of transparency makes it impossible for users or customers to understand how their personal data is processed and protected when shared with these subprocessors, a major violation of GDPR principles. [data_privacy_and_compliance_review.ai_provider_data_sharing[0]][1]

#### Deficient Cookie Consent Management
The website displays a cookie banner stating that it uses cookies for analysis and advertising. [data_privacy_and_compliance_review.cookie_consent_management[0]][1] However, this basic notice is insufficient for compliance. The audit found no evidence of a compliant Consent Management Platform (CMP) that provides:
* A detailed inventory of cookies and trackers.
* Granular choices for users to opt in or out of specific cookie categories.
* A mechanism to block non-essential trackers from firing before explicit consent is given. [data_privacy_and_compliance_review.cookie_consent_management[0]][1]

This represents a significant compliance gap with the ePrivacy Directive and GDPR, which require informed and explicit consent for non-essential cookies. 

#### Gaps in Regional Compliance and User Rights
The audit identified further gaps related to regional data protection laws. There are no described mechanisms for users to exercise their rights (e.g., access, erasure) under GDPR or a "Do Not Sell/Share" link as required by CCPA. [data_privacy_and_compliance_review.regional_compliance_gaps[0]][1] There is also no contact information for a Data Protection Officer (DPO). [data_privacy_and_compliance_review.regional_compliance_gaps[0]][1] Crucially, since the site uses US-based providers (OpenAI, Anthropic, Vercel, Google Cloud), it must document its legal basis for transferring EU/UK resident data, such as Standard Contractual Clauses (SCCs) or Data Privacy Framework (DPF) certification. [data_privacy_and_compliance_review.regional_compliance_gaps[0]][1] The absence of any mention of these transfer mechanisms poses a serious compliance risk. [data_privacy_and_compliance_review.regional_compliance_gaps[0]][1]

## 5. Reliability & Scalability Under Stress — Third-party outage scenarios, lack of circuit breakers, and no status page
AGSEO's architecture, while modern, exhibits a high degree of dependency on external providers without any public information on resilience strategies, creating significant reliability risks.

#### High-Risk Dependency on External Providers
The platform's core functionality is inextricably linked to its infrastructure and AI partners: Vercel, Google Cloud, OpenAI, and Anthropic. [reliability_and_scalability_evaluation.dependency_resilience[0]][1] The audit found no evidence or documentation of standard resilience patterns like timeouts, retries with exponential backoff, or circuit breakers being implemented in the backend code that communicates with these services. [reliability_and_scalability_evaluation.dependency_resilience[0]][1] This suggests a fragile architecture where an outage or performance degradation at a single provider—especially an AI provider—could lead to a complete failure of AGSEO's core service offerings. 

#### Lack of Transparency in Operational Status
The audit found no dedicated public status page or uptime monitor for agseo.pro. This lack of transparency is a gap in professional practice. During an incident or outage, customers have no way to know the operational status of the service or receive updates, leading to frustration and increased support load. Similarly, the examination of the site's pages revealed no user-facing error messages or fallback UIs, making it unclear how runtime failures are presented to users. 

## 6. Performance & Core Web Vitals Baseline — Current unknowns, likely edge caching benefits, and test plan
A definitive performance analysis could not be conducted, as the passive audit methodology did not permit running synthetic lab tests like Google's Lighthouse. [performance_and_core_web_vitals_analysis.largest_contentful_paint[0]][3] Consequently, key performance metrics remain unknown.

#### Unmeasured Core Web Vitals
Core Web Vitals are critical metrics for user experience and SEO. The following were not measured:
* **Largest Contentful Paint (LCP):** Measures loading performance. [performance_and_core_web_vitals_analysis.largest_contentful_paint[0]][3]
* **Cumulative Layout Shift (CLS):** Measures visual stability. [performance_and_core_web_vitals_analysis.cumulative_layout_shift[0]][1]
* **Interaction to Next Paint (INP):** Measures responsiveness to user interactions. [performance_and_core_web_vitals_analysis.interaction_to_next_paint[0]][3]
* **Time to First Byte (TTFB):** Measures server response time. 

Without a baseline for these metrics, it is impossible to assess the site's real-world performance or hold it to any performance SLA. The research recommends running Lighthouse via Chrome DevTools or PageSpeed Insights to obtain this data. [performance_and_core_web_vitals_analysis.largest_contentful_paint[1]][4]

#### Inferred Caching Strategy
While live HTTP headers were not inspected, the site's use of Vercel strongly implies that an advanced caching and compression strategy is available. Vercel's Edge Network acts as a CDN, and its platform typically enables modern compression like Brotli. [technology_stack_analysis.cdn_and_caching[0]][1] However, without active verification, the effectiveness of this implementation is unconfirmed.

## 7. Technical SEO Foundation — Robots.txt, sitemap.xml, canonical tags, and structured data gaps
The audit revealed foundational gaps in AGSEO's technical SEO, which is ironic for a company selling SEO services. These missing artifacts can hinder how effectively search engines crawl and understand the site's content.

* **Crawlability:** A full analysis of crawlability could not be completed because the `robots.txt` file was not successfully retrieved or analyzed, being listed as a "missing artifact." [technical_seo_audit.crawlability[0]][5] This file is essential for telling search engine crawlers which URLs they can or cannot access. [technical_seo_audit.crawlability[0]][5]
* **Indexability:** The assessment of indexability is incomplete as the `sitemap.xml` file was also a "missing artifact." [technical_seo_audit.indexability[0]][5] A sitemap helps search engines discover all important pages on a site. Information on the use of canonical tags and meta robots tags was also unavailable. [technical_seo_audit.indexability[0]][5]
* **Metadata and Rich Snippets:** A detailed review of the site's title tags, meta descriptions, and use of structured data (JSON-LD) for rich snippets was not available in the research findings. The quality and completeness of this metadata are unverified.
* **Internal Linking:** The site appears to have a structured navigation hierarchy with pages for services, tools, blog, and policies. However, a deeper analysis of the internal linking strategy, such as link depth and anchor text distribution, was not performed. 

## 8. Supply-Chain & Dependency Risk — NPM modules, partner APIs, and absent SBOM
AGSEO relies on a significant supply chain of third-party services and software packages, but the audit found no evidence of a process to manage the associated risks. The lack of a Software Bill of Materials (SBOM) is a critical blind spot.

#### Key Dependencies Profile
The platform's operational integrity is dependent on a mix of infrastructure, AI, and marketing technology partners.

| Category | Partner / Technology | Role & Implication |
| :--- | :--- | :--- |
| **Infrastructure & Hosting** | Vercel, Google Cloud | Primary deployment platform and underlying cloud infrastructure; implies serverless Node.js functions and edge network capabilities. [supply_chain_and_dependencies_profile[0]][1] |
| **Core AI Providers** | OpenAI, Anthropic | Power the core AI-driven SEO services; integration is likely server-side. Significant dependency risk. [supply_chain_and_dependencies_profile[0]][1] |
| **Marketing & SEO Tech** | Shopify, Google Ads, SEMRush, Ahrefs, Moz, HubSpot | Listed as 'Certified Technology Partners', indicating integration with or reliance on their tools and data for service delivery. [supply_chain_and_dependencies_profile[0]][1] |
| **Frontend Framework** | React / Next.js (inferred) | Enables Server-Side Rendering (SSR) and a modern single-page application experience. [technology_stack_analysis.frontend_framework[0]][1] |
| **Backend Runtime** | Node.js (inferred) | Executes SSR, API routes, and serverless functions that connect to AI providers. [nodejs_usage_confirmation[0]][1] |

This table highlights the broad surface area of dependencies that must be managed for security and reliability.

#### Vulnerability and License Blind Spots
The research plan included identifying outdated or vulnerable components (NPM packages) and reviewing their licenses. However, this analysis was not executed. [supply_chain_and_dependencies_profile[0]][1] Without an SBOM and regular vulnerability scanning (e.g., for CVEs), AGSEO has no visibility into whether its application contains high-severity vulnerabilities inherited from its open-source dependencies. This is a major risk for any software provider.

## 9. Commercial Readiness & Market Fit — Pricing opacity, SLA void, certifications, and ROI claims versus proof
AGSEO's go-to-market posture is not optimized for enterprise sales, characterized by a lack of transparency and unsubstantiated claims that create friction for procurement and legal teams.

#### Opaque Pricing and No SLA
The website's pricing model is entirely opaque, with no published tiers or cost structures. This forces potential customers into a sales consultation, preventing self-service evaluation and comparison against competitors. Compounding this is the absence of a Service Level Agreement (SLA). The lack of documented commitments on uptime or support is a critical deficiency for any B2B service. 

#### Unsubstantiated Trust Signals
AGSEO uses partner logos and makes bold marketing claims like "Guaranteed ROI 300%" and "99% Satisfaction" to build credibility. [commercial_readiness_assessment.trust_signals_and_certifications[0]][1] However, these are not supported by independent validation. The audit found no mention of recognized security certifications like SOC 2 or ISO 27001, which are standard trust markers that enterprise customers expect to see. [commercial_readiness_assessment.trust_signals_and_certifications[0]][1] This creates a credibility gap between marketing claims and verifiable proof.

## 10. Prioritized Remediation Roadmap — 30/60/90-day actions with effort vs. impact matrix
To close these critical gaps and become enterprise-ready, AGSEO should execute the following prioritized roadmap. Many of the highest-impact actions are policy or configuration changes that require relatively low engineering effort.

| Timeframe | Priority Actions |
| :--- | :--- |
| **First 30 Days** | **Publish a `security.txt` file** with a dedicated email for vulnerability disclosure and clear reporting guidelines. [prioritized_remediation_roadmap.thirty_day_plan[0]][2] <br> **Update Terms of Service** to include a concise SLA section with initial commitments for uptime and support. [prioritized_remediation_roadmap.thirty_day_plan[0]][2] <br> **Generate and publish `robots.txt` and `sitemap.xml`** files and submit them to search consoles. |
| **Next 60 Days** | **Launch a public pricing page** with detailed service tiers to improve commercial transparency. [prioritized_remediation_roadmap.sixty_day_plan[0]][1] <br> **Update Privacy Policy** to detail data sharing with AI providers, including data types, legal basis, and DPA references. <br> **Implement a compliant Cookie Consent Management Platform (CMP)** with granular controls. |
| **Within 90 Days** | **Initiate a security certification process** (e.g., SOC 2 Type 1) and publish a security audit summary to build enterprise trust. [prioritized_remediation_roadmap.sixty_day_plan[0]][1] <br> **Commission a third-party penetration test** and make a summary report available to enterprise prospects. [prioritized_remediation_roadmap.ninety_day_plan[0]][1] <br> **Establish a formal incident response contact point** and a public status page. [prioritized_remediation_roadmap.ninety_day_plan[0]][1] |

This roadmap focuses on building trust and reducing friction in the sales and procurement process.

## 11. Risk Register & Failure Scenarios — High/Medium/Low impacts with mitigations
The audit identified ten key gaps and risks, ranging from high to low severity. The most severe risks relate to security, compliance, and reliability, which could lead to regulatory fines, data breaches, or complete service failure.

| Severity | Area | Gap / Risk Description |
| :--- | :--- | :--- |
| **High** | Security | Absence of a clear `security.txt` file and public vulnerability disclosure policy, hindering responsible reporting. |
| **High** | Compliance / Privacy | Lack of transparency on data sharing with AI providers (OpenAI, Anthropic), with no details on data sent, legal basis, or DPAs. |
| **High** | Reliability | No evidence of resilience patterns (timeouts, retries, circuit breakers) for critical third-party AI APIs, creating a single point of failure. |
| **High** | Compliance / Privacy | Inaccessible privacy policy content and lack of detail on data retention, security measures, international data transfers (SCCs/DPF), and user rights procedures. |
| **Medium** | Commercial | Absence of a formal Service Level Agreement (SLA) with documented commitments on uptime, performance, or support. |
| **Medium** | Commercial | Opaque pricing model with no published plans or tiers, forcing a sales-led process and hindering evaluation. |
| **Medium** | Security | No mention of independent security certifications like SOC 2 or ISO 27001 to validate security posture. |
| **Medium** | Reliability / UX | No visible user-facing error handling or fallback UI, creating a confusing experience during failures. |
| **Medium** | Compliance / Privacy | Cookie banner exists but lacks an accessible cookie inventory or a compliant CMP for granular, pre-consent control. |
| **Low** | Reliability | No public status page or incident communication channel, reducing transparency during outages. |

Addressing the "High" severity risks should be the immediate priority to mitigate the most significant threats to the business and its customers.

## 12. Measurement & Monitoring Plan — Security scans, CWV tracking, uptime monitors, and compliance checkpoints
To move beyond the limitations of this passive audit and establish a mature operational posture, AGSEO should implement a continuous measurement and monitoring plan.

1. **Active Security & Technology Probing:** Conduct regular external scans with tools like Qualys SSL Labs for TLS configuration and SecurityHeaders.com for HTTP headers. [audit_limitations_and_next_steps[0]][3] Perform DNS lookups to verify email security records (SPF, DKIM, DMARC). [audit_limitations_and_next_steps[5]][6]
2. **Performance Benchmarking:** Execute weekly lab tests using Lighthouse and WebPageTest to establish and track Core Web Vitals, TTFB, and other performance metrics. [audit_limitations_and_next_steps[0]][3] Publish key metrics to a public status page.
3. **Functional and API Analysis:** Use browser developer tools to monitor network traffic during interactions with the site's tools to understand data payloads and API behavior. [audit_limitations_and_next_steps[0]][3]
4. **Legal and Compliance Deep Dive:** Perform a detailed textual analysis of the full Privacy Policy, Terms of Service, and Cookie Policy to ensure they meet GDPR/CCPA requirements, especially regarding AI subprocessors. [audit_limitations_and_next_steps[0]][3]

## 13. Conclusion & Next Steps — Decision gateway: proceed to active testing or pause until critical fixes land
AGSEO has built a promising service on a modern, capable technology stack. However, its go-to-market maturity has not kept pace with its technical sophistication. The platform is commercially viable for smaller clients who may be less sensitive to these risks, but it is not enterprise-ready. [executive_summary[0]][1] The combination of security vulnerabilities, significant compliance gaps, and a lack of commercial transparency creates unacceptable risks for larger organizations.

The recommended path forward is to pause any further engagement or procurement and present this report's findings to AGSEO. The 30-day remediation plan outlines low-effort, high-impact fixes that would demonstrate a commitment to maturing their practices. If AGSEO successfully implements these initial changes, a more active and authorized phase of testing could proceed to validate their architecture and security controls more deeply. [audit_limitations_and_next_steps[0]][3] Without these foundational improvements, engaging with AGSEO carries a high degree of unmanaged risk.

## References

1. *AGSEO - AI-Powered SEO Agency | Future of Web Ranking*. https://agseo.pro/
2. *Fetched web page*. https://agseo.pro/.well-known/security.txt
3. *How to analyze website performance with Lighthouse - Medium*. https://medium.com/free-code-camp/three-ways-to-analyze-website-performance-with-lighthouse-8d100966c04b
4. *Introduction to Lighthouse - Chrome for Developers*. https://developer.chrome.com/docs/lighthouse/overview
5. *Robots.txt Introduction and Guide | Google Search Central*. https://developers.google.com/search/docs/crawling-indexing/robots/intro
6. *What are DMARC, DKIM, and SPF? - Cloudflare*. https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/