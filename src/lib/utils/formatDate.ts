const formatDate = function (date: string, showTime = false) {
  if (!date) return;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: showTime ? "short" : undefined,
  }).format(new Date(date));
};

export default formatDate;
