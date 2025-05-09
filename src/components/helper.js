export const checkHeading = (str) => {
  return /^(\*)(\*)(.*)\*$/.test(str);
};

export const replaceStarts = (str) => {
  return str.replace(/^(\*)(\*)|(\*)$/g, "");
};
