// frontend/shared/src/data/faq.tsx
// Purpose: Comprehensive FAQ content based on Sworders FAQ structure, adapted for brand sites
import { FaqItem } from '../components/info/FaqPage'

export function getDefaultFaq(brandName: string): FaqItem[] {
  return [
    // Buying with Brand section
    {
      category: `Buying with ${brandName}`,
      q: 'What are your sale times?',
      a: (
        <div>
          <p>Our specialist sales and regular auctions are typically held weekly, starting at 10:00 AM.</p>
          <p>Please see our extensive sales calendar for specific dates and times. Preview days are scheduled before each sale.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'Can I view items before the sale?',
      a: (
        <div>
          <p>Viewings are welcome without an appointment for most sales. Some specialty auctions may have restricted viewing.</p>
          <p>For specific viewing dates and times, please refer to our sales calendar or contact us directly.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'Can I schedule an appointment for viewing, collection or valuation?',
      a: (
        <div>
          <p>Yes, you can book appointments for valuations, sale viewings, or collection of purchased lots through our website.</p>
          <p>Simply use our online booking system or contact our team directly, and we'll arrange a convenient time for you.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: "I'm unable to attend a viewing, how can I find out about a lot's condition?",
      a: (
        <div>
          <p>You can request detailed condition reports through our website by locating the lot in the catalogue and clicking 'Request Condition Report'.</p>
          <p>Condition reports can also be requested by phone or email. We're unable to provide condition reports on the day of the sale, so please submit requests early.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'How much will I pay if I buy a lot?',
      a: (
        <div>
          <p>When your bid is successful, you pay the hammer price plus a buyer's premium. Our standard buyer's premium is 25% + VAT for most categories.</p>
          <p>Some lots may incur additional charges such as Artist's Resale Right. All fees and charges will be clearly stated in the sale conditions and on your invoice.</p>
          <p>There are no additional online bidding fees when using our platform directly.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'How can I bid?',
      a: (
        <div>
          <p>There are several convenient ways to bid with us:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>In person:</strong> Register for a paddle at our saleroom</li>
            <li><strong>Online:</strong> Bid live through our website with real-time audio and video</li>
            <li><strong>Absentee:</strong> Leave maximum bids in advance</li>
            <li><strong>Telephone:</strong> Speak directly with our staff during the sale</li>
          </ul>
          <p className="mt-2">For a complete guide, see our "Buying with {brandName}" page.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'What payment methods do you accept?',
      a: (
        <div>
          <p>We accept payment by credit or debit card, bank transfer, cash, and cheque.</p>
          <p><strong>Limits apply:</strong> Cash up to €10,000 equivalent, credit cards up to £5,000. Cheques require 8 days clearance before goods can be released.</p>
          <p>We only release goods to third parties with proper identification and written authority from the purchaser.</p>
        </div>
      ),
    },
    {
      category: `Buying with ${brandName}`,
      q: 'Do you offer collection and shipping?',
      a: (
        <div>
          <p>Our team is always available to help whether you're collecting in person or need shipping assistance.</p>
          <p>If you're successful, please book a collection appointment through our website or by calling us. Your items will be ready and waiting at your scheduled time.</p>
          <p>We offer shipping services for various item sizes, from small packages to large furniture, both domestically and internationally.</p>
        </div>
      ),
    },

    // Selling section
    {
      category: `Selling with ${brandName}`,
      q: 'How can I sell at auction?',
      a: (
        <div>
          <p>Getting started is easy. Contact our specialists for a free consultation and valuation of your items.</p>
          <p>We'll guide you through the entire process, from initial assessment to final settlement after the sale.</p>
          <p>See our complete "Selling with {brandName}" guide for detailed information about consigning items.</p>
        </div>
      ),
    },
    {
      category: `Selling with ${brandName}`,
      q: 'How quickly will I be paid for lots that sell?',
      a: (
        <div>
          <p>We aim to pay consigners promptly after each sale:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Specialist auctions: Within 21 days of the sale</li>
            <li>Regular auctions: Within 12-15 days of the sale</li>
          </ul>
          <p className="mt-2">Payment is made for the hammer price less our commission and any applicable fees.</p>
        </div>
      ),
    },

    // General Enquiries
    {
      category: 'General Enquiries',
      q: 'What are your opening hours?',
      a: (
        <div>
          <p>Our regular opening hours are Monday to Friday, 9:00 AM to 5:00 PM.</p>
          <p>Viewings are available during these hours for most sales. Check our sales calendar for specific viewing times and any exceptions.</p>
        </div>
      ),
    },
    {
      category: 'General Enquiries',
      q: 'How do I register for an account on your website?',
      a: (
        <div>
          <p>Registration is quick and easy. Simply fill in your details in our online registration form.</p>
          <p>You'll receive a verification email - don't forget to check your inbox and verify your email address to complete the process.</p>
          <p>Once verified, you can set your bidding preferences and save payment methods for faster checkout.</p>
        </div>
      ),
    },
    {
      category: 'General Enquiries',
      q: "I can't sign in to my account, what should I do?",
      a: (
        <div>
          <p>First, please check that you're entering your username and password correctly.</p>
          <p>If you've forgotten your password, use the "Forgotten Password?" link to reset it.</p>
          <p>If you continue to experience problems, please contact our support team and we'll help resolve the issue.</p>
        </div>
      ),
    },
    {
      category: 'General Enquiries',
      q: 'Can I receive email updates about upcoming auctions?',
      a: (
        <div>
          <p>Absolutely! Once you've registered an account, you can customize your email preferences.</p>
          <p>Set up alerts for specific categories, price ranges, or artists you're interested in, so you only receive relevant notifications.</p>
          <p>Access your preferences through "My Account" settings to refine what updates you receive.</p>
        </div>
      ),
    },

    // Shipping & Delivery
    {
      category: 'Shipping & Delivery',
      q: 'How does your shipping service work?',
      a: (
        <div>
          <p>We use various trusted transport companies depending on the size, value, and destination of your items.</p>
          <p>After adding shipping to your invoice, you'll receive confirmation with carrier details and tracking information once your items are dispatched.</p>
          <p>Delivery times vary: UK small items typically take up to 5 working days, larger items up to 12 working days. International shipping times depend on destination.</p>
        </div>
      ),
    },
    {
      category: 'Shipping & Delivery',
      q: 'Can I get a shipping cost estimate?',
      a: (
        <div>
          <p>Yes! You can get estimated shipping costs by checking the 'Shipping Estimate' tab on any lot page and selecting your destination.</p>
          <p>For larger items or international deliveries where automatic estimates aren't available, we'll provide a custom quote after the sale.</p>
        </div>
      ),
    },
    {
      category: 'Shipping & Delivery',
      q: 'Where can items be shipped to?',
      a: (
        <div>
          <p>We can arrange deliveries both within the UK and internationally.</p>
          <p>For UK deliveries, ensure your delivery address is complete in your account. International shipping may be subject to export restrictions - you're responsible for complying with relevant import/export laws.</p>
        </div>
      ),
    },
    {
      category: 'Shipping & Delivery',
      q: 'Can I combine shipping for multiple items?',
      a: (
        <div>
          <p>Yes! Where possible, we'll combine multiple purchases from the same sale into one shipment.</p>
          <p>We may also offer discounted shipping rates when fewer packing materials are needed for combined lots.</p>
        </div>
      ),
    },
  ] as FaqItem[]
}


