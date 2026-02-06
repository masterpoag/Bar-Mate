export function parseIngredientAmount(str) {
  // Example input: "30 ml white", "1.5 oz", "1 dash"
  const regex = /^([\d./]+)\s*(\w+)?\s*(.*)?$/i;
  const match = str.match(regex);
  if (!match) return { amount: null, unit: null, modifier: null };

  let [ , amountStr, unit, modifier ] = match;

  // Convert fractions like "1/2" or "1 1/2" to decimal
  let amount = 0;
  if (amountStr.includes("/")) {
    const parts = amountStr.split(" ");
    for (const part of parts) {
      if (part.includes("/")) {
        const [num, denom] = part.split("/").map(Number);
        amount += num / denom;
      } else {
        amount += Number(part);
      }
    }
  } else {
    amount = Number(amountStr);
  }

  return {
    amount: isNaN(amount) ? null : amount,
    unit: unit || null,
    modifier: modifier || null
  };
}

