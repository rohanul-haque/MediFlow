import mediFlowApi from "@/lib/axios";
import { ApiResponse, Doctor } from "@/types";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./DoctorCard";
import DoctorCardLoader from "./DoctorCardLoader";
import ErrorCard from "./ErrorCard";

const RelatedDoctors = ({ doctorId }: { doctorId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["related-doctors", doctorId],
    queryFn: async () => {
      const response = await mediFlowApi.get<ApiResponse<Doctor[]>>(
        `/doctor/${doctorId}/related`,
      );
      return response.data.data;
    },
    retry: false,
  });

  return (
    <div className="mt-20">
      {/* ==================== Title and Description ==================== */}
      <div className="mx-auto w-full max-w-lg text-center">
        <h2 className="text-xl leading-[1.1] md:text-2xl">
          Related
          <span className="font-bold text-blue-600"> Doctors</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
          Browse our list of related doctors and book your appointment with the
          right specialist for your healthcare needs.
        </p>
      </div>

      {/* ================== Doctors Cards ================== */}

      {/* ==================== Loading ==================== */}
      {isLoading && (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
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
          {data.map((doctor: Doctor) => {
            return <DoctorCard doctor={doctor} key={doctor._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;
