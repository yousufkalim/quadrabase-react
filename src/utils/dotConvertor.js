export const convertor = (value) => {
  let val = value.toString();
  let splitVal = val.split(".");
  return splitVal[0] + "," + splitVal[1];
};
