/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Components
 */
import Container from "@/components/home/Container";
import { Button } from "@/components/ui/button";

/**
 * Icon
 */
import { CalendarDays, MoveRight } from "lucide-react";

/**
 * Content for Hero Section
 */
const HERO_CONTENT = {
  badge: "Your Health, Our Priority",
  title: "Find The Right Doctor",
  markTitle: "Trusted Healthcare, Anytime",
  description:
    "Connect with trusted doctors, book appointments effortlessly, and manage your healthcare journey from one secure and convenient platform.",
  buttons: [
    { label: "Book an Appointment", icon: <CalendarDays /> },
    { label: "Explore Doctors", icon: <MoveRight /> },
  ],
  trustIndicators: [
    "✓ Trusted Doctors",
    "✓ Easy Appointment Booking",
    "✓ Secure Healthcare",
  ],
};

/**
 * Hero Section
 */

const Hero = () => {
  return (
    <section className="mt-36">
      <Container>
        <div className="px-4 text-center sm:px-6">
          {/* ============= Hero Content ============= */}
          <div className="mx-auto w-full max-w-3xl space-y-6">
            {/* Badge */}
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-blue-500" />
              </span>
              {HERO_CONTENT.badge}
            </p>

            {/* ================= Heading ================= */}
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-gray-900">{HERO_CONTENT.title}</span>{" "}
              <span className="text-blue-600">{HERO_CONTENT.markTitle}</span>
            </h1>

            {/* ===================== Description ==================== */}
            <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              {HERO_CONTENT.description}
            </p>

            {/* ===================== Action Buttons ==================== */}
            <div className="flex flex-col justify-center gap-3 pt-3 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-blue-500 px-4 transition-colors hover:bg-blue-600 sm:w-auto"
              >
                {HERO_CONTENT.buttons[0].icon}
                {HERO_CONTENT.buttons[0].label}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-gray-200 px-4 text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
              >
                {HERO_CONTENT.buttons[1].label}
                {HERO_CONTENT.buttons[1].icon}
              </Button>
            </div>

            {/* ================== Trust Indicators ================== */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-5 text-sm text-gray-400">
              {HERO_CONTENT.trustIndicators.map((trustIndicator, index) => (
                <span key={index}>{trustIndicator}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
