export function formatDate(date: string | Date): string {
  const inputDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Set to yesterday

  // Check if the input date is today
  if (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  // Check if the input date is yesterday
  if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  const day = new Date(date).getDate().toString().padStart(2, "0");
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
  const year = new Date(date).getFullYear();
  return `${day}/${month}/${year}`;

  // If it's not today or yesterday, return the date in a readable format
}

export const formatDateType = (
  date: string | Date,
  formatType: "short" | "long" = "long"
): string => {
  // Convert date to Date object if it's a string
  const d = new Date(date);

  // Options for 'long' format (e.g., Wed, 30 Aug 2023)
  const longFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // 'Wed'
    day: "2-digit", // '30'
    month: "short", // 'Aug'
    year: "numeric", // '2023'
  };

  // Options for 'short' format (e.g., 20-01-2025)
  const shortFormatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit", // '20'
    month: "2-digit", // '01'
    year: "numeric", // '2025'
  };

  // Select options based on formatType
  const options =
    formatType === "long" ? longFormatOptions : shortFormatOptions;

  // Return formatted date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-GB", options).format(d);
};

export const getDurationInDays = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate difference in time
  const timeDifference = end.getTime() - start.getTime();

  // Convert time difference to days (milliseconds in a day = 24 * 60 * 60 * 1000)
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  // Return appropriate day string
  if (dayDifference === 1) {
    return "1 day";
  } else if (dayDifference > 1) {
    return `${dayDifference} days`;
  } else if (dayDifference === 0) {
    return "0 days";
  }
  return "Invalid dates";
};
