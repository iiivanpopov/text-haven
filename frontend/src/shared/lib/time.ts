const ranges: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "second"],
  [60 * 60, "minute"],
  [60 * 60 * 24, "hour"],
  [60 * 60 * 24 * 30, "day"],
  [60 * 60 * 24 * 365, "month"],
];

export const calculateTimeAgo = (input: Date | string): string => {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (let i = ranges.length - 1; i >= 0; i--) {
    const [secondsInUnit, unit] = ranges[i];
    if (diffInSeconds >= secondsInUnit) {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-value, unit);
    }
  }

  return rtf.format(-diffInSeconds, "second");
};
