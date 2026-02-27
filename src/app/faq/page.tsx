// frontend/metsab/src/app/faq/page.tsx
// Purpose: Brand route for Metsab FAQ using shared FaqPage and default content
import { FaqPage, getDefaultFaq, metsabTheme } from '@msaber/shared'

export default function Page() {
  const items = getDefaultFaq('Metsab')
  return (
    <FaqPage intro="Answers to common questions about buying, accounts, payments and shipping." items={items} />
  )
}





