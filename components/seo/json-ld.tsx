import { siteConfig } from "@/lib/config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ClothingStore"],
        "@id": `${siteConfig.url}/#organization`,
        name: "jaynee.ng",
        legalName: "jaynee.ng",
        alternateName: ["jaynee", "Jaynee", "Jaynee NG"],
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        image: `${siteConfig.url}${siteConfig.logo}`,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.whatsapp,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        areaServed: {
          "@type": "Country",
          name: "Nigeria",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: "jaynee.ng",
        alternateName: ["jaynee", "Jaynee"],
        description: siteConfig.description,
        inLanguage: "en-NG",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
