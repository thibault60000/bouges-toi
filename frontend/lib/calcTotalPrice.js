export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.premiumOffer) return tally;
    return tally + cartItem.quantity * cartItem.premiumOffer.price;
  }, 0);
}
