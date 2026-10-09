"use client";

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
 * Thired Party Module
 */
import { useQuery } from "@tanstack/react-query";

/**
 * API
 */
import { doctors } from "@/lib/api";

/**
 * Components
 */
import Container from "@/components/home/Container";
import DoctorCard from "@/components/home/DoctorCard";
import DoctorCardLoader from "@/components/home/DoctorCardLoader";
import ErrorCard from "@/components/home/ErrorCard";
import { Button } from "@/components/ui/button";

/**
 * Icon
 */
import { MoveRight } from "lucide-react";

/**
 * Type
 */
import type { Doctor } from "@/types";

/**
 * Doctors Component
 */
const Doctors = () => {
  // Query For Doctors Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", 8, 0, ""], // Query Key

    queryFn: () =>
      doctors({
        limit: 8,
        skip: 0,
        specialization: "",
      }), // Doctors API Call

    retry: false, // No Retry on Error
  });

  return (
    <section className="py-16">
      <Container>
        {/* ==================== Title and Description ==================== */}
        <div className="mx-auto w-full max-w-lg text-center">
          <h2 className="text-xl leading-[1.1] md:text-2xl">
            Top Doctors to{" "}
            <span className="font-bold text-blue-600">Book Appointments</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
            Browse our list of trusted doctors and book your appointment with
            the right specialist for your healthcare needs.
          </p>
        </div>

        {/* ==================== Loading ==================== */}
        {isLoading && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <DoctorCardLoader key={index} />
            ))}
          </div>
        )}

        {/* ==================== Error ==================== */}
        {isError && (
          <ErrorCard message="Failed to load doctors. Please try again later." />
        )}

        {/* ==================== Doctors ==================== */}
        {!isLoading && !isError && data && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data?.map((doctor: Doctor) => {
              return <DoctorCard doctor={doctor} key={doctor._id} />;
            })}
          </div>
        )}

        {/* ==================== View All Button ==================== */}
        <Link href="/doctors" className="mx-auto mt-8 flex max-w-fit">
          <Button size="lg" variant="outline" className={"cursor-pointer"}>
            View All Doctors <MoveRight />
          </Button>
        </Link>
      </Container>
    </section>
  );
};

export default Doctors;
