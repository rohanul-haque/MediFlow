import {
  Baby,
  Bone,
  Brain,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Venus,
} from "lucide-react";

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
import Container from "./Container";

/**
 * Content for Category
 */
const doctorCategories = [
  {
    id: 1,
    name: "Cardiology",
    icon: HeartPulse,
  },
  {
    id: 2,
    name: "Neurology",
    icon: Brain,
  },
  {
    id: 3,
    name: "Internal Medicine",
    icon: Stethoscope,
  },
  {
    id: 4,
    name: "Pediatrics",
    icon: Baby,
  },
  {
    id: 5,
    name: "Orthopedics",
    icon: Bone,
  },
  {
    id: 6,
    name: "Dermatology",
    icon: Sparkles,
  },
  {
    id: 7,
    name: "Gynecology",
    icon: Venus,
  },
];

/**
 * Category Component
 */
const Category = () => {
  return (
    <section className="py-16">
      <Container>
        {/* ==================== Title and Description ==================== */}
        <div className="mx-auto w-full max-w-lg text-center">
          <h2 className="text-xl leading-[1.1] md:text-2xl">
            Find by <span className="font-bold text-blue-600">Specialty</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
            Simply browse through our extensive list of trusted doctors and
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* ==================== Categories ==================== */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-4">
          {doctorCategories.map(({ id, icon: Icon, name }) => (
            <Link
              href={`/doctors?speciality=${name}`}
              key={id}
              className="group flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-md bg-blue-50 text-center transition-all duration-300 hover:bg-blue-500"
            >
              <Icon
                size={26}
                className="text-blue-500 transition-colors duration-300 group-hover:text-white"
              />

              <span className="mt-2 text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-white">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Category;
