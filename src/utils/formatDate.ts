const formatDate = function (date: Date) {
  if (!date) return;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
  }).format(date);
};

export default formatDate;
