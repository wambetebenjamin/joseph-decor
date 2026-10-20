export function formatKes(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  })
    .format(amount)
    .replace("Ksh", "KES");
}

export function formatDimensions(dimensions: {
  width: number;
  height: number;
  depth: number;
}): string {
  return `W ${dimensions.width} x D ${dimensions.depth} x H ${dimensions.height} cm`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(date));
}

export function formatShortDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    timeZone: "Africa/Nairobi",
  }).format(new Date(date));
}

export function addWorkingDays(from: Date, days: number): Date {
  const date = new Date(from);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return date;
}

export function orderReference(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `JD-${random}`;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
