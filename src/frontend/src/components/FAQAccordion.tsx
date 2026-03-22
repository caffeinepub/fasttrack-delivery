import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQS = [
  {
    id: "faq-track",
    q: "How do I track my package?",
    a: "Enter your tracking number in the search bar at the top of the page. You'll see real-time updates on your shipment's location and status.",
  },
  {
    id: "faq-status",
    q: "What do the different delivery statuses mean?",
    a: "Order Placed means we've received your order. Picked Up means the driver has collected it. In Transit means it's on its way. Delivered means it arrived at the destination.",
  },
  {
    id: "faq-address",
    q: "Can I change my delivery address?",
    a: "Address changes are possible before the package reaches 'In Transit' status. Please contact our support team immediately with your tracking number.",
  },
  {
    id: "faq-delay",
    q: "What if my package is delayed?",
    a: "Delays can happen due to weather, traffic, or high volume periods. The estimated arrival time will update automatically. For urgent cases, contact your driver via the Contact button.",
  },
  {
    id: "faq-accuracy",
    q: "How accurate is the real-time tracking?",
    a: "Our tracking updates every 2\u20135 minutes via GPS. The map shows the last known location of your delivery vehicle along the planned route.",
  },
];

export default function FAQAccordion() {
  return (
    <Card className="shadow-card" data-ocid="faq.card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              data-ocid={`faq.item.${idx + 1}`}
            >
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
