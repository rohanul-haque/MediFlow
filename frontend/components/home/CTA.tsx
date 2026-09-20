/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import Link from "next/link";

/**
 * Components
 */
import Container from "@/components/home/Container";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

/**
 * Content for CTA
 */
const CTA_CONTENT = {
  subtitle: "Take the First Step",
  heading: "Ready to Find the Right Doctor?",
  description:
    "Book an appointment with a trusted doctor and take control of your healthcare journey today.",
  buttonText: "Book Appoinment",
} as const;

/**
 * CTA Componen
 */
const CTA = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl bg-blue-500 px-6 py-14 text-center md:px-12 md:py-16">
          {/* ================= CTA Content ================= */}
          <p className="text-sm font-medium tracking-widest text-gray-100 uppercase">
            {CTA_CONTENT.subtitle}
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-3xl leading-tight font-bold text-white md:text-4xl">
            {CTA_CONTENT.heading}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-100 md:text-base">
            {CTA_CONTENT.description}
          </p>

          {/* ================= CTA Button ================= */}
          <div className="mt-8">
            <Button
              size="lg"
              className="cursor-pointer bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link href="/doctors" className="flex items-center gap-2">
                <Calendar />
                {CTA_CONTENT.buttonText}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
