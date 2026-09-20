/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Modules
 */
import Image from "next/image";

/**
 * Components
 */
import Container from "@/components/home/Container";
import Navbar from "@/components/home/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Asset
 */
import about_banner from "@/assets/about.jpg";

/**
 * Content for About Section
 */
const ABOUT_CONTENT = {
  firstParagraph:
    "MediFlow is a modern healthcare platform designed to make finding doctors and managing medical appointments simple and convenient. Patients can explore doctors, book available appointments, choose online or in-person consultations, and manage their healthcare journey from one place.",

  secondParagraph:
    "We aim to connect patients and healthcare professionals through a secure, user-friendly digital experience. From appointment booking and payments to prescriptions and AI-powered medical assistance, MediFlow brings essential healthcare services together to make the overall experience more accessible and organized.",

  visionParagraph:
    "Our vision is to create a smarter, more accessible, and patient-centered healthcare experience where technology makes it easier for people to find the right doctors, manage appointments, and access essential healthcare services from one trusted platform.",
} as const;

/**
 * Content for Why Choose Section
 */
const WHY_CHOOSE_ME_CONTENT = [
  {
    id: 1,
    title: "Trusted Healthcare",
    description:
      "Connect with verified doctors and access reliable healthcare services.",
  },
  {
    id: 2,
    title: "Smart Convenience",
    description:
      "Book appointments, access prescriptions, and manage healthcare needs seamlessly.",
  },
  {
    id: 3,
    title: "AI-Powered Support",
    description:
      "Get intelligent assistance for health queries and specialist guidance.",
  },
] as const;

/**
 * About Page
 */
const About = () => {
  return (
    <>
      <Navbar />
      <section className="mt-20">
        <Container>
          {/* ================= Title Section ================= */}
          <h1 className="text-center text-xl leading-[1.1] md:text-2xl">
            ABOUT <span className="font-bold text-blue-600"> US</span>
          </h1>

          <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            {/* ================= Image Section ================= */}
            <div className="col-span-1">
              <Image
                src={about_banner}
                alt="about image"
                width={1000}
                height={1000}
                priority
                className="h-87.5 w-full object-cover"
              />
            </div>

            {/* ================== Content Section ================== */}
            <div className="col-span-2 text-gray-600">
              <p className="mb-6">{ABOUT_CONTENT.firstParagraph}</p>
              <p className="mb-6">{ABOUT_CONTENT.secondParagraph}</p>
              <h3 className="mb-2 font-semibold">Our Vison</h3>
              <p>{ABOUT_CONTENT.visionParagraph}</p>
            </div>
          </div>

          {/* ======================= Why Choose Section ======================= */}
          <div className="mt-16">
            <h1 className="text-center text-xl leading-[1.1] md:text-2xl">
              WHY CHOOSE <span className="font-bold text-blue-600"> US</span>
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {WHY_CHOOSE_ME_CONTENT.map((item) => (
                <Card key={item.id} className="rounded-md shadow-2xs">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    {item.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
