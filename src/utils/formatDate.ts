const formatDate = function (date: Date) {
  if (!date) return;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default formatDate;
