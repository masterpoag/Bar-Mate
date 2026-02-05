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
export function parseAmount(str) {
  str = str.trim();
  const match = str.match(/^(\d+\s\d+\/\d+|\d+\/\d+|\d*\.?\d+)\s*(\w+)$/);
  if (!match) return { value: null, unit: null, raw: str };

  let [_, numStr, unit] = match;

  let value;
  if (numStr.includes(" ")) {
    // Mixed number, e.g., "1 1/2"
    const [whole, fraction] = numStr.split(" ");
    const [numerator, denominator] = fraction.split("/").map(Number);
    value = Number(whole) + numerator / denominator;
  } else if (numStr.includes("/")) {
    // Simple fraction, e.g., "3/4"
    const [numerator, denominator] = numStr.split("/").map(Number);
    value = numerator / denominator;
  } else {
    // Decimal or whole number
    value = parseFloat(numStr);
  }

  return {
    value,
    unit: unit.toLowerCase(),
    raw: str,
  };
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
