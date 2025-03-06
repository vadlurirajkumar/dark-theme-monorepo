/**
 * Calculates the number of days remaining until a given expiry date.
 * @param dateTime - The expiration date string.
 * @param format - Format of the return string. Either, seconds, minutes, hours or days
 * @returns The number of days remaining, or null if `expiresAt` is invalid.
 */

interface FunctionProps {
  dateTime: string,
  format?: "S" | "M" | "H" | "D"
}

export function calculateTimeLeft({ dateTime, format = "D"}: FunctionProps ): number | null{

  const now = new Date();
  const expiryDate = new Date(dateTime);

  // Calculate the difference in milliseconds and convert to days
  const differenceInTime = expiryDate.getTime() - now.getTime();

  if ( format === "S") {
    return Math.ceil(differenceInTime / (1000));
  } else if (format === "M") {
    return Math.ceil(differenceInTime / (1000 * 60));
  } else if (format === "H") {  
    return Math.ceil(differenceInTime / (1000 * 60 * 60));
  } else if (format === "D") {
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  }
  return null;
}
