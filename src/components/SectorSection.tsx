import { Stock } from "@/data/stocks";
import { StockCard } from "./StockCard";

interface SectorSectionProps {
  sectorName: string;
  stocks: Stock[];
}

export const SectorSection = ({ sectorName, stocks }: SectorSectionProps) => {
  const sectorId = sectorName.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <section id={sectorId} className="py-12 scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{sectorName}</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </section>
  );
};
