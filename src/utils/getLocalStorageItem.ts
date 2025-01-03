export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const storedItem = JSON.parse(localStorage.getItem(key)!);
    if (storedItem) {
      return storedItem as T; // Parse and return the item if it exists
    }
    return null; // Return null if the item does not exist
  } catch (error) {
    console.error(`Error reading from localStorage for key: ${key}`, error);
    return null; // Return null if an error occurs while parsing
  }
}
