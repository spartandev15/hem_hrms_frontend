export const getFirstAndLastName = (fullName: string) => {
  const fullNameArr = fullName.split(" ");

  const first_name = fullNameArr[0];
  const last_name = fullNameArr.slice(1).join(" ");

  return {
    first_name,
    last_name,
  };
};
