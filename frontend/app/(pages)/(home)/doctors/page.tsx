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
 * Thired-party Modules
 */
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * Application Modules
 */
import getPageNumbers from "@/utils/getPageNumbers";

/**
 * API
 */
import { doctors } from "@/lib/api";

/**
 * Components
 */
import { doctorCategories } from "@/components/home/Category";
import Container from "@/components/home/Container";
import DoctorCard from "@/components/home/DoctorCard";
import DoctorCardLoader from "@/components/home/DoctorCardLoader";
import ErrorCard from "@/components/home/ErrorCard";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Icon
 */
import { X } from "lucide-react";

/**
 * Type
 */
import type { Doctor } from "@/types";

/**
 * Doctor List Limit
 */
const LIMIT = 6;

/**
 * Page Component
 */
const DoctorsPage = () => {
  // Search params hook
  const searchParams = useSearchParams();

  // Current page state
  const [currentPage, setCurrentPage] = useState(1);

  // Get specialization from URL search params
  const specialization = searchParams.get("speciality") || "";

  // Calculate skip
  const skip = (currentPage - 1) * LIMIT;

  // Doctors query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", LIMIT, skip, specialization],
    queryFn: () =>
      doctors({
        limit: LIMIT,
        skip,
        specialization,
      }),
    retry: false,
  });

  // Doctor list
  const doctorList = data?.data ?? [];

  // Total doctors
  const total = data?.total ?? 0;

  // Total pages
  const totalPages = Math.ceil(total / LIMIT);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <section className="mt-20 py-16">
        <Container>
          <div className="mb-6">
            <p className="text-gray-700">
              Browse through our doctors and find the right specialist for your
              healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* ================== Category Filters ================== */}
            <aside className="w-full lg:col-span-1">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Specialties
                </h2>

                {/* =================== Clear Filter Button =================== */}
                {specialization && (
                  <Link
                    href="/doctors"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                    onClick={() => setCurrentPage(1)}
                  >
                    <X size={16} />
                    Clear
                  </Link>
                )}
              </div>

              <ul className="space-y-2">
                {doctorCategories.map(({ id, name, icon: Icon }) => {
                  const isActive = specialization === name;

                  return (
                    <li key={id}>
                      <Link
                        href={`/doctors?speciality=${encodeURIComponent(name)}`}
                        className={`group flex w-full items-center gap-2 rounded-md px-4 py-2 transition-colors duration-300 ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "bg-blue-50 text-gray-800 hover:bg-blue-500 hover:text-white"
                        }`}
                        onClick={() => setCurrentPage(1)}
                      >
                        <Icon
                          size={20}
                          className={`transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-blue-500 group-hover:text-white"
                          }`}
                        />

                        <span className="text-sm font-medium">{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* ================== Doctors Cards ================== */}
            <div className="w-full lg:col-span-4">
              {/* Loading */}
              {isLoading && (
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: LIMIT }).map((_, index) => (
                    <DoctorCardLoader key={index} />
                  ))}
                </div>
              )}

              {/* ================= Error Card ================= */}
              {isError && (
                <ErrorCard message="Failed to load doctors. Please try again later." />
              )}

              {/* ================== Doctors Cards ================== */}
              {!isLoading && !isError && (
                <>
                  {doctorList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {doctorList.map((doctor: Doctor) => (
                        <DoctorCard doctor={doctor} key={doctor._id} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-60 items-center justify-center rounded-lg border border-dashed border-gray-300">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          No doctors found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          No doctors are available for this specialty.
                        </p>

                        {specialization && (
                          <Link
                            href="/doctors"
                            className="mt-4 inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                            onClick={() => setCurrentPage(1)}
                          >
                            Clear filter
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ============ Pagination ============ */}
              {!isLoading && !isError && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      {/* Previous */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                          aria-disabled={currentPage === 1}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {/* ================= Page Numbers ================= */}
                      {getPageNumbers(currentPage, totalPages).map(
                        (pageNum, idx) =>
                          pageNum === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${idx}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                isActive={pageNum === currentPage}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(pageNum);
                                }}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          ),
                      )}

                      {/*  ================= Next Button ================= */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default DoctorsPage;
