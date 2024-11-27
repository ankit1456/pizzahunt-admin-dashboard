const formatCurrency = function (amount: number) {
  if (!amount) return;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export default formatCurrency;
