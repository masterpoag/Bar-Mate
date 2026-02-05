const conversionRates = {
  oz: 1,
  ml: 29.5735,
  cl: 2.95735,
  tbsp: 2,   // 1 tbsp ≈ 0.625 oz
  tsp: 6,  // 1 tsp ≈ 0.2083 oz
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

  // Not measurable → return original string
  if (value == null || !measurableUnits.includes(unit) || !measurableUnits.includes(toUnit)) {
    return raw;
  }

  // Convert to base unit (oz)
  const inOz = value * (conversionRates[unit] || 1);

  // Convert to target unit
  const converted = inOz / (conversionRates[toUnit] || 1);

  return Math.round(converted * 100) / 100;
}