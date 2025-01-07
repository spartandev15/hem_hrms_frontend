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
