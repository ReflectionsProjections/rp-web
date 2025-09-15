export interface LinkItem {
  url: string;
  text: string;
}

export interface LinkData {
  items: LinkItem[];
}

export function parseLinks(description: string): LinkData | null {
  if (!description.includes(":link:")) {
    return null;
  }

  const items: LinkItem[] = [];
  const lines = description.split("\n");

  // First, try to find :link: on its own line (original format)
  const linkStartIndex = lines.findIndex((line) => line.trim() === ":link:");

  if (linkStartIndex !== -1) {
    // Parse from the line after :link:
    for (let i = linkStartIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Stop parsing when we hit another emoji section
      if (line.startsWith(":")) {
        break;
      }

      if (!line) continue;

      // Parse format: :link: https://bit.ly/rp-2025-innovation | Interest Form
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length >= 2) {
        const [url, text] = parts;
        items.push({ url, text });
      }
    }
  } else {
    // Look for :link: inline with text
    for (const line of lines) {
      const linkMatch = line.match(/:link:\s*([^|]+)\s*\|\s*(.+)/);
      if (linkMatch) {
        const [, url, text] = linkMatch;
        items.push({ url: url.trim(), text: text.trim() });
      }
    }
  }

  return items.length > 0 ? { items } : null;
}
