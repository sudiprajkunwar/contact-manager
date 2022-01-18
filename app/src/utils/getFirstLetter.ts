export const getFirstLetter = (data: string) => {
  if (!data) {
    return;
  }
  return data.charAt(0).toUpperCase();
};
