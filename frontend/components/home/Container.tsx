/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Container Component
 */
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto w-full px-5 lg:px-20">{children}</div>
  );
};

export default Container;
