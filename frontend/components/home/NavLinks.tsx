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
 * Navigation Items
 */
export const navItems = [
  { id: 1, path: "/", label: "HOME" },
  { id: 2, path: "/all-doctors", label: "ALL DOCTORS" },
  { id: 3, path: "/about-us", label: "ABOUT US" },
  { id: 4, path: "/contact-us", label: "CONTACT US" },
] as const;

/**
 * Navigation Links Component
 */
const NavLinks = () => {
  const location = usePathname();

  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {navItems.map((item) => (
        <li key={item.id}>
          <Link
            href={item.path}
            className={`text-sm transition-colors ${
              location === item.path ? "font-medium text-blue-500" : ""
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
