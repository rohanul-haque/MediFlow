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
import Logo from "@/components/home/Logo";
import NavLinks from "@/components/home/NavLinks";
import ResponsiveMenu from "@/components/home/ResponsiveMenu";
import { Button } from "@/components/ui/button";

/**
 * Navbar Component
 */
const Navbar = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-b-gray-300 bg-white/30 py-3 backdrop-blur-2xl">
      <Container>
        <nav className="flex items-center justify-between">
          {/* ============== Logo ============== */}
          <Logo />

          {/* ============== Navigation Links ============== */}
          <NavLinks />

          {/* ============== Action Buttons ============== */}
          <div className="flex items-center gap-2">
            <Link className="hidden lg:block" href="/signup">
              <Button
                className="cursor-pointer bg-blue-500 transition-colors hover:bg-blue-600"
                size="lg"
              >
                Create Account
              </Button>
            </Link>

            {/* ============== Responsive Menu ============== */}
            <ResponsiveMenu />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
