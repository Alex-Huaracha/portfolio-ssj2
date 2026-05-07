function parseMonth(value: string): { year: number; month: number } {
  if (value === 'present') {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const [year, month] = value.split('-').map(Number) as [number, number];
  return { year, month };
}

export function formatDuration(startDate: string, endDate: string): string {
  const start = parseMonth(startDate);
  const end = parseMonth(endDate);
  // Inclusive count: a role from 2024-03 to 2024-12 reads as 10 months,
  // matching CV convention (start and end months both counted as worked).
  const totalMonths =
    (end.year - start.year) * 12 + (end.month - start.month) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}m`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}m`;
}

export function formatDate(value: string): string {
  if (value === 'present') return 'now';
  const [year, month] = value.split('-') as [string, string];
  return `${month}.${year.slice(2)}`;
}
