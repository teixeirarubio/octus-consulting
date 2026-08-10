import { pageSocialMeta } from "../../lib/pageMeta";
export const metadata = pageSocialMeta({
  title: "Privacy Policy",
  description:
    
    "How Octus Consulting collects and uses personal data when you contact us via WhatsApp or email through octusconsulting.com.",
  path: "/privacy",
});

const sections = [
  {
    title: "Who we are",
    body: `This Privacy Policy applies to Octus Technology LLC, operating as Octus Consulting ("Octus", "we", "us"), a company incorporated in the State of Delaware, United States, with registered address at 900 Foulk Rd Suite 201, Wilmington, DE 19803.\n\nOctus Consulting provides regulatory structuring, compliance coordination, corporate architecture and related advisory services to businesses operating in regulated markets. This policy governs how we collect, use and protect personal data in connection with our website (octusconsulting.com) and services delivered to clients.`,
  },
  {
    title: "What data we collect",
    body: `We collect personal data you provide directly when interacting with our website or contacting us:\n\n• Identification and contact information: name, company name, job title, email address, phone number.\n• Operational context: jurisdiction of operation, type of regulated business, and any information you choose to share when you contact us.\n• Communications: the content of emails, WhatsApp messages or other messages you send to us.\n\nAs of this update, the public website does not host an HTML contact form that posts data to our servers. Primary contact channels are WhatsApp and email (mailto).\n\nOptional website analytics may collect aggregate usage signals (such as page path and CTA interaction events) only when: (1) production measurement IDs are configured by Octus, (2) you are on octusconsulting.com or www.octusconsulting.com, and (3) you have granted analytics consent. Analytics are off by default. We do not invent active analytics collection when those conditions are not met.\n\nWe do not collect sensitive personal data (such as health information, racial or ethnic origin, or biometric data) in the ordinary course of our business.`,
  },
  {
    title: "How we use your data",
    body: `We use personal data for the following purposes:\n\n• To respond to enquiries and diagnostic requests you send via WhatsApp, email or other channels we publish.\n• To assess your operational situation and prepare for an initial consultation.\n• To fulfil our contractual obligations to clients.\n• To comply with applicable legal requirements.\n• To maintain and improve our website and services.\n• To send service-related communications where you have engaged with us.\n\nWe do not use your personal data for marketing purposes without your explicit consent. We do not sell personal data to third parties under any circumstances.`,
  },
  {
    title: "Legal bases for processing",
    body: `We process personal data on the following legal grounds:\n\n• Contractual necessity: where processing is required to fulfil or prepare for a contract with you.\n• Legitimate interests: where processing is necessary for our legitimate business purposes, provided these are not overridden by your rights.\n• Legal obligation: where processing is required to comply with applicable law.\n• Consent: where you have given explicit consent, which you may withdraw at any time.`,
  },
  {
    title: "Data sharing and disclosure",
    body: `We do not sell, rent or trade personal data. We may share data in the following limited circumstances:\n\n• Service providers: third parties who assist us in operating our business (such as hosting or communication platforms), bound by confidentiality obligations.\n• Legal requirements: where disclosure is required by applicable law, regulation, court order or regulatory authority.\n• Business transfers: in connection with a merger, acquisition or transfer of assets, subject to standard confidentiality protections.\n\nWhere we engage jurisdiction-specific partners in the execution of client mandates, data sharing is governed by appropriate agreements and applicable data protection law. This policy does not invent a list of subprocessors.`,
  },
  {
    title: "International data transfers",
    body: `Octus Consulting operates across multiple jurisdictions. Personal data may be transferred to and processed in countries outside your country of residence, including the United States. Where such transfers occur, we apply safeguards required by applicable data protection law. References to GDPR or LGPD describe regimes that may apply depending on your location and the processing context; they are not a claim of certification.`,
  },
  {
    title: "Data retention",
    body: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Contact and diagnostic correspondence is retained for the duration of any engagement and for a reasonable period thereafter for operational and legal record-keeping purposes. You may request deletion of your data at any time, subject to legal retention requirements.`,
  },
  {
    title: "Your rights",
    body: `Depending on your jurisdiction, you may have the following rights regarding your personal data:\n\n• Right of access: to obtain confirmation of whether we hold your data and receive a copy.\n• Right to rectification: to have inaccurate or incomplete data corrected.\n• Right to erasure: to request deletion of your data where no legal basis for retention applies.\n• Right to restriction: to request that we limit processing in certain circumstances.\n• Right to portability: to receive your data in a structured, machine-readable format.\n• Right to object: to object to processing based on legitimate interests.\n• Right to withdraw consent: where processing is based on consent, to withdraw it at any time.\n\nTo exercise any of these rights, contact us at the details below.`,
  },
  {
    title: "Cookies",
    body: `The website uses necessary first-party storage for basic operation and to remember your cookie preference. Optional analytics (Google Tag Manager orchestrating GA4) load only after you grant analytics consent, only on the production hosts octusconsulting.com / www.octusconsulting.com, and only when Octus has configured the required environment IDs. Advertising and personalization tags are not used; related Consent Mode signals remain denied. For full details and to reopen preferences, see our Cookie Policy.`,
  },
  {
    title: "Data protection contact",
    body: `For data protection enquiries, including requests to exercise your rights or lodge a complaint, contact:\n\nEmail: compliance@octusconsulting.com\nPostal: Octus Technology LLC, 900 Foulk Rd Suite 201, Wilmington, DE 19803, United States\n\nThis page does not invent a named Data Protection Officer appointment. If you are located in the European Union or United Kingdom, you also have the right to lodge a complaint with your local supervisory authority.`,
  },
  {
    title: "Changes to this policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Material changes will be indicated by an updated date at the top of this page. We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <section className="surface-dark relative flex min-h-[70vh] flex-col justify-center pt-24 pb-16 md:min-h-[80vh] md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: "760px" }}>
          <span className="mb-5 block text-xs font-medium uppercase tracking-[0.12em] text-white/65">Legal</span>
          <h1 className="font-heading text-[1.85rem] font-semibold leading-[1.18] tracking-[-0.005em] text-[color:var(--text-primary-on-dark)] sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.12] sp-headline">Privacy Policy</h1>
          <p className="text-lg leading-relaxed text-white/60 max-w-2xl">Last updated: August 2026</p>
        </div>
      </section>
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: "760px" }}>
          {sections.map((s, i) => (
            <div
              key={s.title}
              style={{
                marginBottom: "40px",
                paddingBottom: "40px",
                borderBottom: i < sections.length - 1 ? "1px solid var(--border-solid)" : "none",
              }}
            >
              <h2 className="heading-sm" style={{ marginBottom: "16px" }}>
                {s.title}
              </h2>
              {s.body.split("\n\n").map((para, j) => (
                <p key={j} className="body-text" style={{ marginBottom: "12px", whiteSpace: "pre-line" }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
