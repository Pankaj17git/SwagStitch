const getDiscount = (price) => {
  let discount = 0;

  if (price > 1000) {
    discount = 0.2;
  } else if (price > 5000) {
    discount = 0.10;
  } else if (price > 8000) {
    discount = 0.20;
  }

  let discountedPrice = price - (price * discount)
  let discountPercentage = discount * 100;
  return {
    price,
    discountPercentage,
    discountedPrice,
  }
}

export default getDiscount;