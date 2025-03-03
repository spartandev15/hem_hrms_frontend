export function capitalizeFirstLetter(str: string, split: string) {
  return str
    .split(split) // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back together with underscores
}
