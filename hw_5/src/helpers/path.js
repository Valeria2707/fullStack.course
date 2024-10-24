export const getPath = (text) =>
  text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase()}`;
