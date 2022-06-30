export const formatNumber = (input, fractionSeparator, thousandsSeparator, fractionSize) => {
  fractionSeparator = fractionSeparator || ",";
  thousandsSeparator = thousandsSeparator || " ";
  fractionSize = fractionSize || 2;
  var output = "",
    parts = [];

  input = input?.toString();
  parts = input?.split(".");

  if (parts?.length > 0) {
    parts[0] = parts[0].split("").reverse().join("");
    parts[0] = parts[0].replace(/(\d{3})/g, "$1" + thousandsSeparator).trim();
    output = parts[0].split("").reverse().join("");
    if (parts.length > 1) {
      output += fractionSeparator;
      output += parts[1].substring(0, fractionSize);
    }
  }
  return output;
};
