function dollarToRupees(dollars, rate = 83) {
  if (typeof dollars !== "number" || dollars < 0) {
    throw new Error("Please provide a valid positive number.");
  }
  return dollars * rate;
}

export default dollarToRupees;