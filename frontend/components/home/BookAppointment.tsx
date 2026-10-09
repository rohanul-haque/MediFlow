"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { createAppointment, getAvailableSlots } from "@/lib/api";
import { ErrorResponse, ValidationError } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CalendarDays, Clock } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface BookAppointmentProps {
  doctorId: string;
}

const getLocalFormattedDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const BookAppointment: React.FC<BookAppointmentProps> = ({ doctorId }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>(
    undefined,
  );
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  const selectedDate = selectedDateObj
    ? getLocalFormattedDate(selectedDateObj)
    : "";

  // Query Available Slots
  const {
    data: slotsData,
    isLoading: isLoadingSlots,
    isError,
  } = useQuery({
    queryKey: ["doctor-available-slots", doctorId, selectedDate],
    queryFn: () => getAvailableSlots(doctorId, selectedDate),
    enabled: !!selectedDate && !!doctorId,
    retry: false,
  });

  const slots = slotsData?.data || [];

  // Mutation for booking appointment
  const bookMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      // Reset selections
      setSelectedSlot(null);
      // Invalidate slots to refresh
      queryClient.invalidateQueries({
        queryKey: ["doctor-available-slots", doctorId, selectedDate],
      });
      setOpen(false); // Close modal
    },
    onError: (error: AxiosError<ValidationError | ErrorResponse>) => {
      const errorData = error.response?.data;

      // Network or Unknown Error
      if (!errorData) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      // Validation Error
      if (errorData.code === "VALIDATION_ERROR") {
        Object.values(errorData.errors).forEach(({ msg }) => {
          toast.error(msg);
        });

        return;
      }

      // Server Error
      toast.error(errorData.message);
    },
  });

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDateObj(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: {
    startTime: string;
    endTime: string;
    status: "available" | "booked";
  }) => {
    if (slot.status === "available") {
      setSelectedSlot({ startTime: slot.startTime, endTime: slot.endTime });
    }
  };

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    bookMutation.mutate({
      doctor: doctorId,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      paymentMethod: "online",
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          size="lg"
          className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto"
        >
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto rounded-xl p-6 sm:max-w-200">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Book Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Calendar */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2 text-gray-600">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Select Date</span>
            </div>

            <div className="flex justify-center rounded-xl border border-gray-200 p-2 shadow-sm **:data-[selected-single=true]:bg-blue-500! **:data-[selected-single=true]:text-white!">
              <Calendar
                mode="single"
                selected={selectedDateObj}
                onSelect={handleDateChange}
                disabled={(date) => date < todayObj}
                className="w-full"
                classNames={{
                  today: "bg-gray-100 text-gray-900",
                }}
              />
            </div>
          </div>

          {/* Right: Slots */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Select Time Slot</span>
            </div>

            <div className="min-h-80 flex-1 rounded-xl border border-gray-200 p-6">
              {!selectedDate ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-gray-400">
                  Select a date to view available time slots
                </div>
              ) : isLoadingSlots ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              ) : isError ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-red-500">
                  Failed to load appointment slots
                </div>
              ) : slots.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-gray-400">
                  No time slots are available
                </div>
              ) : (
                <div className="grid max-h-75 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
                  {slots.map((slot, index) => {
                    const isSelected =
                      selectedSlot?.startTime === slot.startTime &&
                      selectedSlot?.endTime === slot.endTime;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={slot.status === "booked"}
                        onClick={() => handleSlotSelect(slot)}
                        className={`rounded-full border px-2 py-2 text-sm font-medium transition-colors ${
                          slot.status === "booked"
                            ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through opacity-70"
                            : isSelected
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-400"
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-3 border-t border-gray-100 pt-4 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={bookMutation.isPending}

            size={"lg"}
          >
            Close
          </Button>
          <Button
            size={"lg"}
            onClick={handleBook}
            disabled={!selectedSlot || !selectedDate || bookMutation.isPending}
            className="rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            {bookMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
