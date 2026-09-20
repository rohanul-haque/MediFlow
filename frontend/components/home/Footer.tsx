"use client";

/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Modules
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Components
 */
import Container from "./Container";
import Logo from "./Logo";
import { navItems } from "./NavLinks";

/**
 * Contact Information
 */
const CONTACT_INFORMATION = [
  { id: 1, label: "Phone", value: "+880 17XXXXXXXX" },
  { id: 2, label: "Email", value: "support@mediflow.com" },
  { id: 3, label: "Address", value: "Dhaka, Bangladesh" },
];

/**
 * Content for Footer Section
 */
const FOOTER_CONTENT = {
  description:
    "MediFlow is a modern healthcare platform that makes finding trusted doctors and booking appointments simple. Connect with healthcare professionals, manage your appointments, and access essential healthcare services—all in one place.",
  companyTitle: "COMPANY",
  getInTouchTitle: "GET IN TOUCH",
  copyright: "MediFlow. All rights reserved.",
};

/**
 * Footer Component
 */
const Footer = () => {
  const location = usePathname();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4 md:gap-8">
          {/* ================= Brand ================= */}
          <div className="md:col-span-2">
            <Logo />

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
              {FOOTER_CONTENT.description}
            </p>
          </div>

          {/* ================= Company ================= */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900">
              {FOOTER_CONTENT.companyTitle}
            </h3>

            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`text-sm transition-colors ${
                      location === item.path
                        ? "font-medium text-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Get In Touch ================= */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900">
              {FOOTER_CONTENT.getInTouchTitle}
            </h3>

            <div className="mt-4 space-y-2">
              {CONTACT_INFORMATION.map((item) => (
                <span
                  key={item.id}
                  className="flex items-center gap-1 text-sm text-gray-500"
                >
                  <b>{item.label}:</b> <p>{item.value}</p>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Copyright ================= */}

        <div className="border-t border-gray-300 py-5 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {FOOTER_CONTENT.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
