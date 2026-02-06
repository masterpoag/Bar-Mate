// Conversion table in milliliters
const toMl = {
  ml: 1,
  cl: 10,          // 1 cl = 10 ml
  oz: 29.5735,     // 1 fl oz = 29.5735 ml
  tbsp: 14.7868,   // 1 tbsp = 14.7868 ml
  tsp: 4.92892,    // 1 tsp = 4.92892 ml
};

// Convert amount object { amount: Number, unit: String } to target unit
export function convertAmount(amount, fromUnit, toUnit) {
  if (
    typeof amount !== "number" ||
    !fromUnit ||
    !toUnit ||
    !toMl[fromUnit] ||
    !toMl[toUnit]
  ) {
    // If conversion is not possible, return the original amount with its unit
    return `${amount} ${fromUnit || ""}`;
  }

  // Convert from source unit → ml
  const inMl = amount * toMl[fromUnit];

  // Convert ml → target unit
  const converted = inMl / toMl[toUnit];

  // Round to 2 decimals
  return Math.round(converted * 100) / 100;
}
