const toMl = {
  ml: 1,
  cl: 10,          // 1 cl = 10 ml
  oz: 29.5735,     // 1 fl oz = 29.5735 ml
  tbsp: 14.7868,   // 1 tbsp = 14.7868 ml
  tsp: 4.92892,    // 1 tsp = 4.92892 ml
};

// Units that are "measurable" and can be converted
const measurableUnits = Object.keys(conversionRates);

// Parse amount string like "1 oz", "1/2 oz", "1 1/2 oz"
export function parseAmount(amountStr) {
  if (!amountStr) return { value: null, unit: null, raw: amountStr };

  const regex = /^(\d+\s\d+\/\d+|\d+\/\d+|\d+(\.\d+)?)\s*(\w+)?/i;
  const match = amountStr.trim().match(regex);

  if (!match) return { value: null, unit: null, raw: amountStr };

  let [_, num, , unit] = match;

  // Handle fractions like "1/2" or "1 1/2"
  let value;
  if (num.includes(" ")) {
    const [whole, fraction] = num.split(" ");
    const [numerator, denominator] = fraction.split("/");
    value = parseInt(whole) + parseInt(numerator) / parseInt(denominator);
  } else if (num.includes("/")) {
    const [numerator, denominator] = num.split("/");
    value = parseInt(numerator) / parseInt(denominator);
  } else {
    value = parseFloat(num);
  }

  return { value, unit: unit ? unit.toLowerCase() : "oz", raw: amountStr };
}

// Convert parsed amount to target unit, only if measurable
export function convertAmount(amountStr, toUnit) {
  const { value, unit, raw } = parseAmount(amountStr);

  if (
    value == null ||
    !toMl[unit] ||
    !toMl[toUnit]
  ) {
    return raw;
  }

  // Convert unit → ml
  const inMl = value * toMl[unit];

  // Convert ml → target
  const converted = inMl / toMl[toUnit];

  return Math.round(converted * 100) / 100;
}
