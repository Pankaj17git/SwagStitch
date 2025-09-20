const getDiscount = (price) => {
  let discount = 0;

  if (price > 8000) {
    discount = 0.20; // 20%
  } else if (price > 5000) {
    discount = 0.10; // 10%
  } else if (price > 1000) {
    discount = 0.05; // 5%
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
