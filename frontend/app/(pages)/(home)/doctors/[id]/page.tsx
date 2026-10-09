"use client";

/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Next.js Module
 */
import Image from "next/image";
import { useParams } from "next/navigation";

/**
 * Thired Party Module
 */
import { useQuery } from "@tanstack/react-query";

/**
 * Components
 */
import BookAppointment from "@/components/home/BookAppointment";
import Container from "@/components/home/Container";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

/***
 * API
 */
import { viewDoctorDetails } from "@/lib/api";

/**
 * Icon
 */
import RelatedDoctors from "@/components/home/RelatedDoctors";
import { BadgeCheck, Info } from "lucide-react";

/**
 * View Doctor Detail Page Component
 */
const ViewDoctorDetails = () => {
  // Doctor ID from URL
  const { id } = useParams();

  // Doctor ID
  const doctorId = id as string;

  // Doctors Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => viewDoctorDetails({ id: doctorId }),
    enabled: !!doctorId,
    retry: false,
  });

  // Doctor data
  const doctor = data?.data;

  return (
    <>
      <Navbar />

      <section className="mt-20 py-16">
        <Container>
          {isLoading ? (
            /* ================= Loading State ================= */
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {/* ================== Doctor Image Skeleton ================== */}
              <div className="overflow-hidden rounded-lg border border-gray-300">
                <Skeleton className="h-full min-h-80 w-full rounded-none" />
              </div>

              {/* ================== Doctor Information Skeleton ================== */}
              <div className="rounded-lg border border-gray-300 bg-white p-6 lg:col-span-3">
                {/* ================== Name ================== */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-64" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>

                {/* ================ Qualification + Experience ================ */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>

                {/* ================= Specializations ================= */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                  <Skeleton className="h-8 w-28 rounded-lg" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>

                {/* ================ About ================ */}
                <div className="mt-7">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>

                  <div className="mt-2 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[85%]" />
                  </div>
                </div>

                {/* ===============Appointment Fee=============== */}
                <div className="mt-5 flex items-center gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </div>
          ) : isError ? (
            /* ================= Error State ================= */
            <div className="flex min-h-60 items-center justify-center rounded-lg border border-gray-300">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Failed to load doctor information. Please try again later.
                </p>
              </div>
            </div>
          ) : !doctor ? (
            /* ================= Doctor Not Found ================= */
            <div className="flex min-h-60 items-center justify-center rounded-lg border border-gray-300">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Doctor not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We could not find the doctor you are looking for.
                </p>
              </div>
            </div>
          ) : (
            /* ================= Doctor Details ================= */
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {/* Doctor Image */}
              <div className="overflow-hidden rounded-lg border border-gray-300">
                <div className="relative h-full min-h-80 w-full">
                  <Image
                    src={doctor.avatar?.url || "/avatar.png"}
                    alt={doctor.user.fullName || "Doctor"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* ================== Doctor Information ================== */}
              <div className="rounded-lg border border-gray-300 bg-white p-6 lg:col-span-3">
                {/* ================= Name ================= */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {doctor.user.fullName}
                  </h1>

                  <BadgeCheck size={20} className="fill-blue-500 text-white" />
                </div>

                {/* ===================== Qualification + Experience ===================== */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-gray-600">
                    {doctor.qualification}
                  </p>

                  <span className="rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-600">
                    {doctor.experience} Years Experience
                  </span>
                </div>

                {/* ================ Specializations ================ */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {doctor.specialization.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* ===================== About ===================== */}
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900">
                      About Doctor
                    </h2>

                    <Info size={18} className="text-blue-500" />
                  </div>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                    {doctor.bio}
                  </p>
                </div>

                {/* ================== Appointment Fee ================== */}
                <div className="mt-3 flex items-center">
                  <p className="text-gray-700">Appointment Fee: $</p>

                  <span className="font-medium">{doctor.consultationFee}</span>
                </div>

                {/* ================== Book Appointment ================== */}
                <BookAppointment doctorId={doctorId} />
              </div>
            </div>
          )}

          <RelatedDoctors doctorId={doctorId} />
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default ViewDoctorDetails;
