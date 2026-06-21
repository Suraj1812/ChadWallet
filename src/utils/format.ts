export function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number) {
  if (value > 1) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value > 100 ? 0 : 2,
    }).format(value);
  }

  return "$" + value.toPrecision(3);
}

export function formatPercent(value: number) {
  const prefix = value > 0 ? "+" : "";
  return prefix + value.toFixed(2) + "%";
}

export function shortAddress(address: string) {
  if (address.length <= 12) {
    return address;
  }

  return address.slice(0, 4) + "..." + address.slice(-4);
}
