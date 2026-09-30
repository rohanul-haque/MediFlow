/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Error Card Component
 */
const ErrorCard = ({ message }: { message: string }) => {
  return (
    <div className="mt-10 rounded-md border border-gray-200 bg-red-50 p-8 text-center">
      <p className="text-sm font-medium text-red-500">{message}</p>
    </div>
  );
};

export default ErrorCard;
