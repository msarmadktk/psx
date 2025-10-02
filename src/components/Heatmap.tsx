import { useEffect, useMemo, useRef, useState } from "react";
import { allStocks, Stock } from "@/data/stocks";
import { Link } from "react-router-dom";

type Rect = { x: number; y: number; width: number; height: number };
type ItemRect = Rect & { stock: Stock };

function splitByHalf(items: Stock[]): [Stock[], Stock[]] {
  const weights = items.map(s => Math.max(0.0001, Math.abs(s.changePercent)));
  const total = weights.reduce((a, b) => a + b, 0);
  let running = 0;
  let index = 0;
  for (let i = 0; i < items.length; i++) {
    running += weights[i];
    if (running >= total / 2) {
      index = i + 1;
      break;
    }
  }
  if (index <= 0 || index >= items.length) index = Math.max(1, Math.floor(items.length / 2));
  return [items.slice(0, index), items.slice(index)];
}

function layoutSliceAndDice(
  items: Stock[],
  rect: Rect,
  horizontal: boolean
): ItemRect[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ ...rect, stock: items[0] }];

  const [firstGroup, secondGroup] = splitByHalf(items);
  const weight = (stocks: Stock[]) => stocks.reduce((sum, s) => sum + Math.max(0.0001, Math.abs(s.changePercent)), 0);
  const w1 = weight(firstGroup);
  const w2 = weight(secondGroup);
  const total = w1 + w2 || 1;

  if (horizontal) {
    const width1 = rect.width * (w1 / total);
    const r1: Rect = { x: rect.x, y: rect.y, width: width1, height: rect.height };
    const r2: Rect = { x: rect.x + width1, y: rect.y, width: rect.width - width1, height: rect.height };
    return [
      ...layoutSliceAndDice(firstGroup, r1, !horizontal),
      ...layoutSliceAndDice(secondGroup, r2, !horizontal)
    ];
  } else {
    const height1 = rect.height * (w1 / total);
    const r1: Rect = { x: rect.x, y: rect.y, width: rect.width, height: height1 };
    const r2: Rect = { x: rect.x, y: rect.y + height1, width: rect.width, height: rect.height - height1 };
    return [
      ...layoutSliceAndDice(firstGroup, r1, !horizontal),
      ...layoutSliceAndDice(secondGroup, r2, !horizontal)
    ];
  }
}

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

function colorForChange(changePercent: number) {
  // Normalize color by sign only so all positives share the same shade and all negatives share the same shade
  if (changePercent >= 0) {
    return `hsl(142 70% 40%)`;
  } else {
    return `hsl(0 80% 48%)`;
  }
}

export function Heatmap({ stocks = allStocks }: { stocks?: Stock[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setSize({ width: Math.floor(cr.width), height: Math.ceil(Math.max(260, cr.width * 0.48)) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sorted = useMemo(() => {
    const copy = [...stocks];
    copy.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
    return copy;
  }, [stocks]);

  const rects = useMemo(() => {
    if (size.width <= 0 || size.height <= 0) return [] as ItemRect[];
    return layoutSliceAndDice(sorted, { x: 0, y: 0, width: size.width, height: size.height }, true);
  }, [sorted, size]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative w-full overflow-hidden rounded-xl border border-border/50" style={{ height: size.height }}>
        {rects.map((r, idx) => {
          const bg = colorForChange(r.stock.changePercent);
          const labelColor = "hsl(var(--background))";
          return (
            <Link
              key={r.stock.symbol + idx}
              to={`/stock/${r.stock.symbol}`}
              className="absolute focus:outline-none group"
              style={{ left: r.x, top: r.y, width: r.width, height: r.height }}
            >
              <div
                className="w-full h-full p-2 sm:p-3 transition-transform duration-200 ease-out rounded-md shadow-sm group-hover:shadow-lg group-hover:scale-[1.03] group-focus-visible:scale-[1.03] group-hover:z-[1] border border-white/60 dark:border-black/70"
                style={{ background: bg }}
              >
                <div className="flex items-start justify-between gap-2 text-base sm:text-lg md:text-xl" style={{ color: labelColor, fontFamily: "Poppins, ui-sans-serif, system-ui" }}>
                  <div className="font-semibold break-words">{r.stock.symbol}</div>
                  <div className="font-medium">{r.stock.changePercent >= 0 ? "+" : ""}{r.stock.changePercent.toFixed(2)}%</div>
                </div>
                <div className="mt-1 text-base sm:text-lg md:text-xl opacity-85 truncate" style={{ color: labelColor, fontFamily: "Poppins, ui-sans-serif, system-ui" }}>
                  PKR {r.stock.currentPrice.toFixed(2)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Heatmap;


