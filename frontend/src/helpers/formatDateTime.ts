export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const realMonth = date.getMonth() + 1;
  const month = date.getMonth() < 9 ? `0${realMonth}` : realMonth;
  const day = date.getDate() < 9 ? `0${date.getDate() + 1}` : date.getDate() + 1;

  return `${day}/${month}/${date.getFullYear()}`;
};
