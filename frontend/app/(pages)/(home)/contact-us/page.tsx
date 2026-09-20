/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Components
 */
import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/home/Container";
import Navbar from "@/components/home/Navbar";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Icon
 */
import { Mail, MapPin, Phone } from "lucide-react";

/**
 * Contact Information List
 */
const CONTACT_INFORMATION = [
  {
    id: 1,
    icon: MapPin,
    title: "Address",
    description: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    icon: Phone,
    title: "Phone",
    description: "+880 1XXX-XXXXXX",
  },
  {
    id: 3,
    icon: Mail,
    title: "Email",
    description: "support@mediflow.com",
  },
] as const;

/***
 * Contact Page
 */
const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="mt-20">
        <Container>
          {/* ================= Title Section ================= */}
          <h1 className="text-center text-xl leading-[1.1] md:text-2xl">
            CONTACT <span className="font-bold text-blue-600"> US</span>
          </h1>
          {/* ================= Contact Section ================= */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium tracking-widest text-blue-600 uppercase">
                Get In Touch
              </p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold md:text-4xl">
                Have Any <span className="text-blue-600">Question?</span>
              </h2>
              {/* ================= Contact Cards ================= */}
              <div className="mt-8 space-y-4">
                {CONTACT_INFORMATION.map((contact) => (
                  <Card className="rounded-md shadow-2xs" key={contact.id}>
                    <CardContent className="flex items-center gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                        <contact.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {contact.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {contact.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* ================= Contact Form ================= */}
            <div className="rounded-md border border-gray-200 bg-white p-6 shadow-2xs">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
