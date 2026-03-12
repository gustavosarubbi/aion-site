import { ConnectionPath } from "./types";

export function createWirePath(
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number, 
  seed: number
): string {
  const dx = endX - startX;
  const dy = endY - startY;
  
  const cp1x = startX + dx * 0.3;
  const cp1y = startY + dy * 0.1;
  
  const cp2x = startX + dx * 0.7;
  const cp2y = endY - 30;

  return `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`;
}

export function calculateConnectionPaths(
  containerRect: DOMRect,
  hubRect: DOMRect,
  cardRefs: (HTMLDivElement | null)[],
  hubCenterRef: HTMLDivElement | null
): ConnectionPath[] {
  // Hub origin - right side of the hub
  const hx = hubRect.left - containerRect.left + hubRect.width;
  const hy = hubRect.top - containerRect.top + (hubRect.height * 0.5);

  return cardRefs.map((card, idx) => {
    if (!card) return null;
    const rect = card.getBoundingClientRect();

    // Card center, top edge - exactly at the card border
    const cx = rect.left - containerRect.left + (rect.width / 2);
    const cy = rect.top - containerRect.top; // Exactly at the card border

    const path = createWirePath(hx, hy, cx, cy, idx + 1);

    return { id: idx, path, cx, cy, hx, hy };
  }).filter((item): item is ConnectionPath => item !== null);
}

export function generateTangledPath(
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number, 
  seed: number
): string {
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const chaos = 0.4 + (seed % 3) * 0.2;

  const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
  const random2 = ((seed * 49297 + 9301) % 233280) / 233280;
  const random3 = ((seed * 233280 + 49297) % 9301) / 9301;

  const cp1x = startX + dx * 0.3 + (random1 - 0.5) * distance * chaos;
  const cp1y = startY + dy * 0.4 + (random2 - 0.5) * distance * 0.3;

  const cp2x = startX + dx * 0.7 + (random2 - 0.5) * distance * chaos * 1.2;
  const cp2y = startY + dy * 0.6 + (random3 - 0.5) * distance * 0.4;

  const cp3x = endX + (random3 - 0.5) * 30;
  const cp3y = endY - 40 + (random1 - 0.5) * 20;

  return `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${cp3x} ${cp3y} S ${endX} ${endY - 20} ${endX} ${endY}`;
}
