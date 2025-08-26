function dollarToRupees(dollars, rate = 83) {
  let amount = Math.round(dollars)
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Please provide a valid positive number.");
  }
  return amount * rate;
}

export default dollarToRupees;