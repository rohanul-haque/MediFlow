/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import Image from "next/image";
import Link from "next/link";

/**
 * Type
 */
import type { Doctor } from "@/types";

/**
 * Doctor Card Component
 */
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <Link
      href={`/doctor/${doctor._id}`}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 ease-in-out hover:scale-103"
    >
      {/* ==================== Doctor Image ==================== */}
      <div className="relative h-62.5 w-full border-b">
        <Image
          src={doctor.avatar.url}
          alt={doctor.user.fullName}
          fill
          loading="eager"
          className="object-cover"
        />
      </div>

      {/* ==================== Doctor Info ==================== */}
      <div className="space-y-2 p-4">
        {/* Available */}
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-medium text-emerald-600">
            Available
          </span>
        </div>

        {/* ==================== Name ==================== */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Dr. {doctor.user.fullName}
          </h3>
        </div>

        {/* ==================== Qualification ==================== */}
        <p className="text-sm text-gray-500">{doctor.qualification}</p>

        {/* ==================== Specialization ==================== */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {doctor.specialization.map((specialization, index) => (
            <span
              key={`${specialization}-${index}`}
              className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
            >
              {specialization}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
