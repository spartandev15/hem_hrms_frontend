export function calculateExperience(joiningDate: string) {
  const joinDate = new Date(joiningDate);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - joinDate.getFullYear();
  let months = currentDate.getMonth() - joinDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}
