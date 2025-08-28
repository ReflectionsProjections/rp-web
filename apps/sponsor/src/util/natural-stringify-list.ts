export function naturalStringifyList(items: string[]): string {
  const len = items.length;

  if (len === 0) {
    return "";
  }

  if (len === 1) {
    return items[0];
  }

  if (len === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  const allButLast = items.slice(0, -1).join(", ");
  const last = items[len - 1];
  return `${allButLast}, and ${last}`;
}

export function formatMajorsMinors(majors: string[], minors: string[]): string {
  // If no minors, just list majors on separate lines, no "(Major)"
  if (minors.length === 0) {
    return majors.join("\n");
  }

  // Otherwise, label each major and minor, one per line
  const majorLines = majors.map((m) => `${m} (Major)`);
  const minorLines = minors.map((m) => `${m} (Minor)`);
  return [...majorLines, ...minorLines].join(", ");
}
