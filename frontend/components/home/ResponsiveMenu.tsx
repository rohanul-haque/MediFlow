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
import Logo from "@/components/home/Logo";
import { navItems } from "@/components/home/NavLinks";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Icon
 */
import { Menu } from "lucide-react";

/**
 * Responsive Menu
 */
const ResponsiveMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      {/* ============== Menu Trigger ============== */}
      <SheetTrigger
        render={
          <Button
            className="cursor-pointer rounded-sm lg:hidden"
            variant="outline"
          >
            <Menu />
          </Button>
        }
      />

      <SheetContent>
        {/* ============== Menu Header ============== */}
        <SheetHeader>
          <Logo />
        </SheetHeader>

        <hr className="-my-5" />

        {/* ============== Navigation Links ============== */}
        <ul className="mt-10 flex flex-col items-start gap-6 px-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`text-sm transition-colors ${
                  pathname === item.path ? "font-medium text-blue-500" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ============== Menu Footer ============== */}
        <SheetFooter>
          <Link className="cursor-pointer" href="/signup">
            <Button
              className="w-full bg-blue-500 transition-colors hover:bg-blue-600"
              size="lg"
            >
              Create Account
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveMenu;
