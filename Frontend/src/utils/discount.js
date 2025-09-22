const getDiscount = (price, discountRules = []) => {
  let discount = 0;

  // Sort rules by minAmount (to make sure higher thresholds come last)
  const sortedRules = [...discountRules].sort((a, b) => a.minAmount - b.minAmount);

  for (let rule of sortedRules) {
    if (price >= rule.minAmount) {
      discount = rule.discount; // decimal (0.05 = 5%)
    }
  }

  const discountedPrice = price - (price * discount);
  const discountPercentage = discount * 100;

  return {
    price,
    discountPercentage,
    discountedPrice,
  };
};

export default getDiscount;
