/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Modules
 */
import Image from "next/image";
import Link from "next/link";

/**
 * Asset
 */
import logo from "@/assets/logo.png";

/**
 * Logo Component
 */
const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} alt="logo" width={45} height={45} />
      <p className="text-2xl font-semibold text-gray-800">
        <span className="text-blue-500">Medi</span>Flow
      </p>
    </Link>
  );
};

export default Logo;
