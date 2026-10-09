/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Converts a time string like "10:00 AM" to minutes from midnight
 */
export const timeToMinutes = (timeStr: string): number => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) {
    hours = 0;
  }

  if (modifier === "PM") {
    hours += 12;
  }

  return hours * 60 + minutes;
};

/**
 * Converts minutes from midnight to a time string like "10:00 AM"
 */
export const minutesToTime = (totalMinutes: number): string => {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const modifier = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");

  return `${hoursStr}:${minutesStr} ${modifier}`;
};

/**
 * Generates 30-minute slots between a start and end time
 */
export const generateSlots = (
  from: string,
  to: string,
  interval: number = 30
): { startTime: string; endTime: string }[] => {
  const startMinutes = timeToMinutes(from);
  const endMinutes = timeToMinutes(to);

  const slots = [];
  let currentMinutes = startMinutes;

  while (currentMinutes + interval <= endMinutes) {
    slots.push({
      startTime: minutesToTime(currentMinutes),
      endTime: minutesToTime(currentMinutes + interval),
    });
    currentMinutes += interval;
  }

  return slots;
};
