import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@msaber/shared";
import metsabLogo from "../../assets/brand_logo_metsab.png";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Metsab Auctions",
  description: "The exclusive destination for exceptional collectibles, rare artifacts, and valuable treasures.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader
          logoSrc={(metsabLogo as unknown as { src: string }).src || (metsabLogo as unknown as string)}
          brandName="Metsab"
          logoHref="/"
          theme={{
            bgClass: 'bg-white',
            borderClass: 'border-b border-slate-200',
            textClass: 'text-slate-900',
            hoverTextClass: 'hover:text-slate-700 transition-colors duration-200',
            hoverBgClass: 'hover:bg-slate-100 transition-all duration-200 rounded-lg'
          }}
          links={[
            {
              label: 'Auctions',
              menuGroups: [
                {
                  title: 'Auctions',
                  links: [
                    { label: 'Upcoming Auctions', href: '/auctions?status=planned' },
                    { label: 'Results', href: '/auctions?status=ended' },
                    { label: 'Buying with Metsab', href: '/buying' }
                  ]
                },
                {
                  title: 'Services',
                  links: [
                    { label: 'Metsab Online Bidding', href: '/auctions' },
                    { label: 'Invoice Payment', href: '/pay' },
                    { label: 'FAQs', href: '/faq' }
                  ]
                }
              ]
            },
            { label: 'Departments', href: '#' },
            {
              label: 'Services',
              menuGroups: [
                {
                  title: 'Selling',
                  links: [
                    { label: 'Selling with Metsab', href: '#' },
                    { label: 'Request an Online Valuation', href: '/inventory-form' },
                    { label: 'Book a Valuation or Collection', href: '#' }
                  ]
                },
                {
                  title: 'Support',
                  links: [
                    { label: 'Valuation Days & Events Calendar', href: '#' },
                    { label: 'Private Client Valuations', href: '#' },
                    { label: 'Collection & Shipping', href: '/collection-shipping' }
                  ]
                }
              ]
            },
            {
              label: 'Discover',
              menuGroups: [
                {
                  title: 'Content & Insights',
                  links: [
                    { label: 'News, Views & Insights', href: '#' },
                    { label: 'Newsletter Sign Up', href: '#' },
                    { label: 'Artists, Authors, Designers & Makers', href: '#' }
                  ]
                },
                {
                  title: 'Media',
                  links: [
                    { label: 'Metsab in the Press', href: '#' }
                  ]
                }
              ]
            },
            {
              label: 'About',
              menuGroups: [
                {
                  title: 'Our Company',
                  links: [
                    { label: 'About Metsab', href: '/about' },
                    { label: 'Locations', href: '#' },
                    { label: 'Careers at Metsab', href: '/careers' },
                    { label: 'An Award-Winning Saleroom', href: '#' }
                  ]
                },
                {
                  title: 'Values & Community',
                  links: [
                    { label: 'Sustainability at Metsab', href: '#' },
                    { label: 'Press Office', href: '#' },
                    { label: 'Cultural Enrichment & Charity Partnerships', href: '#' },
                    { label: 'Client Testimonials', href: '#' },
                    { label: 'Our Core Values', href: '/core-values' }
                  ]
                }
              ]
            },
            { label: 'My Account', href: '#' }
          ]}
        />
        {children}
        <SiteFooter
          brandCopyright="Metsab"
          brandCode="METSAB"
          theme={{
            bgClass: 'bg-white text-black',
            borderClass: 'border-neutral-200',
            textClass: 'text-neutral-800',
            headingClass: 'font-semibold text-black',
            inputClass: 'border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500',
            buttonClass: 'px-4 py-2 bg-black text-white rounded'
          }}
          linkGroups={[
            { title: 'Popular Pages', links: [
              { label: 'Upcoming Auctions', href: '/auctions' },
              { label: 'Consign Your Items', href: '/inventory-form' },
              { label: 'Results', href: '/auctions?status=ended' },
              { label: 'News & Articles', href: '#' },
              { label: 'Buying', href: '#' },
              { label: 'Selling', href: '#' },
              { label: 'Collection & Shipping', href: '#' },
              { label: 'FAQs', href: '#' },
            ]},
            { title: 'Connect', links: [
              { label: 'Facebook', href: '#' },
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' }
            ]}
          ]}
        />
      </body>
    </html>
  );
}
