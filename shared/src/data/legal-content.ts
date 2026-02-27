// frontend/shared/src/data/legal-content.ts
// Purpose: Default legal content templates with brand placeholders

import { LegalPageContent } from '../types/legal'

export const PRIVACY_POLICY_CONTENT: LegalPageContent = {
  pageType: 'privacy-policy',
  title: 'Privacy Policy',
  subtitle: 'How we protect and use your information',
  description:
    '[brandName] operates modern auction services built on our proprietary platform. This overview explains how we collect, use, and safeguard your personal data across our marketplace touchpoints.',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `This Privacy Policy applies between you, the User of this Website, and [brandName], the owner and operator of this marketplace. It explains how we collect and use your personal data when you access or use our services.

Please read this policy together with our Buyer Terms and Conditions and Seller Terms and Conditions before participating in any sales or services offered through our platform.

**Please read this Privacy Policy carefully**.`,
      order: 1
    },
    {
      id: 'data-collection',
      title: 'Data Collection',
      content: `We may collect and process the following data about you:
      
- Information you provide by filling in forms on our Website
- Information provided when you register to use our Website
- Information provided when you report a problem with our Website
- Records of correspondence between us
- Details of transactions you carry out through our Website
- Details of your visits to our Website including traffic data and location data`,
      order: 2
    },
    {
      id: 'data-use',
      title: 'Use of Your Information',
      content: `We use information held about you in the following ways:

- To ensure that content from our Website is presented effectively for you and your computer
- To provide you with information, products or services that you request from us
- To carry out our obligations arising from any contracts entered into between you and us
- To allow you to participate in interactive features of our service
- To notify you about changes to our service`,
      order: 3
    },
    {
      id: 'contact-details',
      title: 'Contact Information',
      content: `For any questions regarding this privacy policy, you can contact us at:

**Address:** [brandAddress]
**Email:** [brandEmail]
**Phone:** [brandPhone]
**Website:** [brandWebsite]`,
      order: 4
    }
  ],
  contactSection: {
    title: 'Questions About Your Privacy?',
    description: 'If you have any questions about our privacy policy or how we handle your data, please don\'t hesitate to contact us:'
  },
  navigation: {
    primaryLink: {
      text: 'View Auctions',
      href: '/auctions'
    },
    secondaryLinks: [
      { text: 'Buyer Terms', href: '/buyer-terms-conditions' },
      { text: 'Seller Terms', href: '/seller-terms-conditions' }
    ]
  }
}

export const BUYER_TERMS_CONTENT: LegalPageContent = {
  pageType: 'buyer-terms',
  title: 'Buyer Terms & Conditions',
  subtitle: 'Terms and conditions for buyers',
  description: '[brandName] carries on business, including the conduct of Auctions, on these general conditions.',
  sections: [
    {
      id: 'company-info',
      title: 'Company Information',
      content: `**[brandName]; Company Registration: [companyRegistration]; Registered Address: [brandAddress]**`,
      order: 1
    },
    {
      id: 'introduction',
      title: 'Introduction',
      content: `[brandName] carries on business, including the conduct of Auctions, on these general conditions.

[brandName] acts on behalf of sellers as agent and retains the right to bid and complete a purchase through its own auctions.`,
      order: 2
    },
    {
      id: 'definitions',
      title: '1. Definitions',
      content: `The following defined terms are used in these Conditions:

"Auction" means any Auction conducted by [brandName];
"Bidder" means a bidder at an Auction;
"Buyer" means the bidder whose bid was the last bid;
"Hammer Price" means the level of bidding reached;
"Lot" means any Consigned Property accepted by [brandName] for offer at Auction;
"Vendor" or "Seller" means the vendor of an item;`,
      order: 3
    },
    {
      id: 'website',
      title: '2. Website',
      content: `You may access most areas of the Website without registering your details with us.

[brandName] may revise these Conditions at any time by updating this page.`,
      order: 4
    },
    {
      id: 'conduct',
      title: '3. Visitor Material and Conduct',
      content: `Other than personally identifiable information, any material you transmit or post to the Website shall be considered non-confidential.`,
      order: 5
    },
    {
      id: 'publicity',
      title: '4. Publicity',
      content: `Catalogue and buyer guides are provided for information only.`,
      order: 6
    },
    {
      id: 'auction',
      title: '5. The Auction',
      content: `Any Auction shall be conducted at the absolute discretion of the Auctioneer.

The Auctioneer shall conduct the Auction with reasonable skill and care.`,
      order: 7
    },
    {
      id: 'bidders',
      title: '6. Bidders',
      content: `Bidders may be required to register their particulars.

You accept full liability for all bids submitted via [brandName]'s Website.`,
      order: 8
    },
    {
      id: 'buyer',
      title: '7. The Buyer',
      content: `Immediately after a Lot is sold, the Buyer shall give to [brandName] their name and address.

[brandName] may, at its absolute discretion, agree credit terms with the Buyer.`,
      order: 9
    },
    {
      id: 'purchase-price',
      title: '8. The Purchase Price',
      content: `The Buyer will pay the Hammer Price and a buyer's premium.`,
      order: 10
    },
    {
      id: 'title-collection',
      title: '9. Title and Collection of Purchases',
      content: `The ownership of any Lot purchased shall not pass to the relevant Buyer until they have made payment in full.`,
      order: 11
    },
    {
      id: 'default',
      title: '10. Default by Buyer',
      content: `If any Lot is not paid for in full, [brandName] shall be entitled to exercise remedies including re-selling the Lot.`,
      order: 12
    },
    {
      id: 'description',
      title: '11. Description and Conditions',
      content: `Whilst [brandName] seek to describe lots accurately, prospective Buyers must satisfy themselves as to all matters.`,
      order: 13
    },
    {
      id: 'forgeries',
      title: '12. Deliberate Forgeries',
      content: `Subject to clause 12.2, any representation as to authorship is a statement of opinion only.`,
      order: 14
    },
    {
      id: 'liability',
      title: '13. Limitations of Liability',
      content: `All members of the public on the premises are there at their own risk.`,
      order: 15
    },
    {
      id: 'warranty',
      title: '14. Warranty of Title and Availability',
      content: `The Vendor warrants to the auctioneer that the Vendor is the true owner of the property.`,
      order: 16
    },
    {
      id: 'disputes',
      title: '15. Dispute Resolution',
      content: `Any dispute arising between the parties shall be dealt with in accordance with this clause.`,
      order: 17
    },
    {
      id: 'general',
      title: '16. General',
      content: `Any notice may be given by email.

These Conditions and any disputes shall be governed by the law of England and Wales.`,
      order: 18
    }
  ],
  contactSection: {
    title: 'Questions About Terms?',
    description: 'If you have any questions about these terms and conditions, please don\'t hesitate to contact us:'
  },
  navigation: {
    primaryLink: {
      text: 'View Auctions',
      href: '/auctions'
    },
    secondaryLinks: [
      { text: 'Seller Terms', href: '/seller-terms-conditions' },
      { text: 'Privacy Policy', href: '/privacy-policy' }
    ]
  }
}

export const SELLER_TERMS_CONTENT: LegalPageContent = {
  pageType: 'seller-terms',
  title: 'Seller Terms & Conditions',
  subtitle: 'Terms and conditions for sellers',
  description: 'These terms govern the relationship between [brandName] and sellers consigning items for auction.',
  sections: [
    {
      id: 'company-info',
      title: 'Company Information',
      content: `**[brandName]; Company Registration: [companyRegistration]; Registered Address: [brandAddress]**`,
      order: 1
    },
    {
      id: 'introduction',
      title: 'Introduction',
      content: `These terms govern the relationship between [brandName] and sellers consigning items for auction.

By consigning items with [brandName], you agree to be bound by these terms and conditions.`,
      order: 2
    },
    {
      id: 'consignment',
      title: '1. Consignment',
      content: `The seller warrants that they are the legal owner of the property being consigned and have the right to sell.

All items must be delivered to [brandName] in good condition and properly described.`,
      order: 3
    },
    {
      id: 'commission',
      title: '2. Commission and Charges',
      content: `[brandName] charges a seller's commission as agreed in the consignment agreement.

Additional charges may apply for insurance, cataloguing, and marketing.`,
      order: 4
    },
    {
      id: 'reserves',
      title: '3. Reserve Prices',
      content: `Reserve prices may be agreed between the seller and [brandName].

Items below reserve will not be sold unless specifically agreed.`,
      order: 5
    },
    {
      id: 'payment',
      title: '4. Payment to Sellers',
      content: `Payment to sellers will be made within 35 days of the sale, subject to successful payment by the buyer.

[brandName] retains the right to offset any expenses against sale proceeds.`,
      order: 6
    }
  ],
  contactSection: {
    title: 'Questions About Selling?',
    description: 'If you have any questions about consigning items or these terms, please contact us:'
  },
  navigation: {
    primaryLink: {
      text: 'View Auctions',
      href: '/auctions'
    },
    secondaryLinks: [
      { text: 'Buyer Terms', href: '/buyer-terms-conditions' },
      { text: 'Privacy Policy', href: '/privacy-policy' }
    ]
  }
}

// Helper function to get content by page type
export function getLegalContent(pageType: 'privacy-policy' | 'buyer-terms' | 'seller-terms'): LegalPageContent {
  switch (pageType) {
    case 'privacy-policy':
      return PRIVACY_POLICY_CONTENT
    case 'buyer-terms':
      return BUYER_TERMS_CONTENT
    case 'seller-terms':
      return SELLER_TERMS_CONTENT
    default:
      throw new Error(`Unknown legal page type: ${pageType}`)
  }
}

