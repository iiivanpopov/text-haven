export const calculateTimeAgo = (date: Date | string) => {
  const pastMillis =
    Date.now() -
    (typeof date == "string" ? new Date(date).getTime() : date.getTime());

  const minutes = Math.ceil(pastMillis / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (hours >= 1) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
};
