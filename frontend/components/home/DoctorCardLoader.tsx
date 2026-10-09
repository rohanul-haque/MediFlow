/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Component
 */
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Doctor Card Loader Component
 */
const DoctorCardLoader = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Doctor Image Skeleton */}
      <Skeleton className="h-62.5 w-full rounded-none" />

      {/* Doctor Info Skeleton */}
      <div className="space-y-3 p-4">
        {/* Available */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Name */}
        <Skeleton className="h-6 w-36" />

        {/* Qualification */}
        <Skeleton className="h-4 w-44" />

        {/* Specialization */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCardLoader;
