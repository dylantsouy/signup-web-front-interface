export const dateTimeTransfer = (fmt) => {
  const newDate = new Date(fmt);
  const formatDate = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  return formatDate;
};
export const dateNow = () => {
  const newDate = new Date();
  const formatDate = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
  return formatDate;
};
export const dateTransfer = (date) => {
  const newDate = new Date(date);
  const formatDate = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1 > 9
      ? newDate.getMonth() + 1
      : "0" + (newDate.getMonth() + 1)
  }-${newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()}`;
  return formatDate;
};
