// transform the key
function getQualificationByKey(key: string) {
  if (key === "tenth_dmc") {
    return "10th Qualification";
  } else if (key === "twelft_dmc") {
    return "12th Qualification";
  } else {
    return "Invalid key";
  }
}
