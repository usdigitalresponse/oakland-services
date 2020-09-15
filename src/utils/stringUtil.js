export const truncateString = (str, num = 280) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
