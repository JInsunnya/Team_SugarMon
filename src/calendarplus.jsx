export const generateDatesForMonth = (year, month) => {
  const dates = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
