/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Components
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Content for How It Works
 */
const HOW_IT_WORKS = [
  {
    id: "item-1",
    question: "How do I find a doctor on MediFlow?",
    answer:
      "You can search for doctors by name, specialization, or location. Browse doctor profiles to view their qualifications, experience, consultation fees, and available appointment slots.",
  },
  {
    id: "item-2",
    question: "How can I book an appointment?",
    answer:
      "Choose a doctor, select an available appointment slot, and choose your preferred consultation type. You can then confirm your appointment by completing the required booking and payment process.",
  },
  {
    id: "item-3",
    question: "Can I consult a doctor online?",
    answer:
      "Yes. MediFlow supports online consultations through Google Meet. After booking an online appointment, you can access the meeting details from your appointment information.",
  },
  {
    id: "item-4",
    question: "How can I access my prescription?",
    answer:
      "After your consultation, your doctor can provide a digital prescription. You can access your prescription from your MediFlow dashboard and receive it through your registered email.",
  },
  {
    id: "item-5",
    question: "Can I cancel or manage my appointment?",
    answer:
      "Yes. You can view and manage your appointments from your dashboard. Depending on the appointment status and cancellation policy, you may be able to cancel or update your appointment.",
  },
] as const;

/**
 * How It Works Componen
 */
const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-5">
        {/* =================== Title =================== */}
        <h1 className="mb-10 text-center text-xl leading-[1.1] md:text-2xl">
          How It <span className="font-bold text-blue-600"> Works</span>
        </h1>

        {/* =================== Accordion =================== */}
        <Accordion>
          {HOW_IT_WORKS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="cursor-pointer text-left md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HowItWorks;
