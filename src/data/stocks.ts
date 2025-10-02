export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  founded: string;
  description: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export const stocksBySector: Record<string, Stock[]> = {
  Banking: [
    {
      symbol: "UBL",
      name: "United Bank Limited",
      sector: "Banking",
      founded: "1958/1959",
      description: "Large commercial bank offering retail, corporate, Islamic banking and asset management.",
      currentPrice: 245.50,
      change: 3.20,
      changePercent: 1.32
    },
    {
      symbol: "MEBL",
      name: "Meezan Bank Limited",
      sector: "Banking",
      founded: "1997",
      description: "Pakistan's largest Islamic bank (Sharia-compliant retail & corporate banking).",
      currentPrice: 128.75,
      change: -1.25,
      changePercent: -0.96
    },
    {
      symbol: "HBL",
      name: "Habib Bank Limited",
      sector: "Banking",
      founded: "1941",
      description: "Full-service commercial bank with large international presence.",
      currentPrice: 156.30,
      change: 2.10,
      changePercent: 1.36
    },
    {
      symbol: "ABL",
      name: "Allied Bank Limited",
      sector: "Banking",
      founded: "1942",
      description: "Commercial bank with retail, corporate, Islamic banking services.",
      currentPrice: 89.40,
      change: 0.60,
      changePercent: 0.67
    },
    {
      symbol: "BAFL",
      name: "Bank Alfalah Limited",
      sector: "Banking",
      founded: "1992",
      description: "Commercial & Islamic banking, project & trade finance, digital banking.",
      currentPrice: 67.85,
      change: -0.45,
      changePercent: -0.66
    }
  ],
  "Oil & Gas": [
    {
      symbol: "OGDC",
      name: "Oil & Gas Development Company Limited",
      sector: "Oil & Gas",
      founded: "1961",
      description: "Pakistan's large state-sector explorer & producer (onshore oil & gas fields).",
      currentPrice: 198.20,
      change: 9.91,
      changePercent: 5.00
    },
    {
      symbol: "MARI",
      name: "Mari Petroleum Company Limited",
      sector: "Oil & Gas",
      founded: "1984",
      description: "Upstream oil & gas exploration and production.",
      currentPrice: 2350.00,
      change: -15.00,
      changePercent: -0.63
    },
    {
      symbol: "POL",
      name: "Pakistan Oilfields Limited",
      sector: "Oil & Gas",
      founded: "1950",
      description: "Oil & gas E&P and related products (subsidiary of Attock Oil Company).",
      currentPrice: 567.50,
      change: 8.25,
      changePercent: 1.47
    },
    {
      symbol: "PPL",
      name: "Pakistan Petroleum Limited",
      sector: "Oil & Gas",
      founded: "1950",
      description: "Major state-owned E&P company (Sui and other fields).",
      currentPrice: 145.60,
      change: 2.80,
      changePercent: 1.96
    },
    {
      symbol: "PSO",
      name: "Pakistan State Oil Company Limited",
      sector: "Oil & Gas",
      founded: "1974",
      description: "Largest downstream OMC — fuel marketing, storage, refining & distribution.",
      currentPrice: 234.90,
      change: -3.40,
      changePercent: -1.43
    }
  ],
  Technology: [
    {
      symbol: "SYS",
      name: "Systems Limited",
      sector: "Technology",
      founded: "1977",
      description: "IT & software services company (software development, BPO, digital transformation).",
      currentPrice: 1245.00,
      change: 25.00,
      changePercent: 2.05
    },
    {
      symbol: "NETSOL",
      name: "NetSol Technologies",
      sector: "Technology",
      founded: "1997",
      description: "Software company focused on asset-finance & leasing solutions (global clients).",
      currentPrice: 89.75,
      change: 1.50,
      changePercent: 1.70
    },
    {
      symbol: "TRG",
      name: "TRG Pakistan Limited",
      sector: "Technology",
      founded: "2002",
      description: "Investment/holding company focused on IT-enabled services and technology investments.",
      currentPrice: 156.30,
      change: -2.10,
      changePercent: -1.33
    },
    {
      symbol: "PTC",
      name: "Pakistan Telecommunication Company Ltd",
      sector: "Technology",
      founded: "1995",
      description: "Nationwide fixed-line, broadband and backbone telecom services.",
      currentPrice: 15.45,
      change: 0.15,
      changePercent: 0.98
    },
    {
      symbol: "PAKD",
      name: "Pak Datacom Limited",
      sector: "Technology",
      founded: "1992",
      description: "National telecom/ICT services, managed networks and IT solutions.",
      currentPrice: 45.20,
      change: 0.90,
      changePercent: 2.03
    }
  ],
  Textile: [
    {
      symbol: "NML",
      name: "Nishat Mills Limited",
      sector: "Textile",
      founded: "1951",
      description: "Vertically integrated textile group — yarn, spinning, weaving, apparel, export & retail.",
      currentPrice: 78.90,
      change: 1.20,
      changePercent: 1.54
    },
    {
      symbol: "GADT",
      name: "Gul Ahmed Textile Mills Limited",
      sector: "Textile",
      founded: "1953",
      description: "Textiles & garments, plus retail brand (Ideas by Gul Ahmed).",
      currentPrice: 45.60,
      change: -0.80,
      changePercent: -1.72
    },
    {
      symbol: "SAPT",
      name: "Sapphire Textile Mills Limited",
      sector: "Textile",
      founded: "1969",
      description: "Manufactures yarn, fabrics, home-textiles, finishing, stitching and printing.",
      currentPrice: 1234.50,
      change: 15.30,
      changePercent: 1.25
    },
    {
      symbol: "CRTM",
      name: "Crescent Textile Mills Limited",
      sector: "Textile",
      founded: "1950",
      description: "Composite textile unit — spinning, weaving, processing, home textiles and power generation.",
      currentPrice: 34.75,
      change: 0.55,
      changePercent: 1.61
    },
    {
      symbol: "KTML",
      name: "Kohinoor Textile Mills",
      sector: "Textile",
      founded: "1948",
      description: "Integrated fabric/textile operations.",
      currentPrice: 23.40,
      change: -0.30,
      changePercent: -1.27
    }
  ],
  Cement: [
    {
      symbol: "LUCK",
      name: "Lucky Cement Limited",
      sector: "Cement",
      founded: "1993",
      description: "Large cement producer and exporter (multiple plants across Pakistan).",
      currentPrice: 845.00,
      change: 12.50,
      changePercent: 1.50
    },
    {
      symbol: "DGKC",
      name: "D.G. Khan Cement",
      sector: "Cement",
      founded: "1978",
      description: "Large cement producer (part of Nishat Group).",
      currentPrice: 123.75,
      change: -1.85,
      changePercent: -1.47
    },
    {
      symbol: "ACPL",
      name: "Attock Cement Pakistan Limited",
      sector: "Cement",
      founded: "1981",
      description: "Cement manufacturer (plants in Hub) — part of Attock/Pharaon group.",
      currentPrice: 178.50,
      change: 3.20,
      changePercent: 1.82
    },
    {
      symbol: "PIOC",
      name: "Pioneer Cement Limited",
      sector: "Cement",
      founded: "1998",
      description: "Top 10 cement producer in Pakistan.",
      currentPrice: 89.30,
      change: 1.10,
      changePercent: 1.24
    },
    {
      symbol: "MLCF",
      name: "Maple Leaf Cement Factory Limited",
      sector: "Cement",
      founded: "1956",
      description: "Major cement manufacturer with nationwide distribution.",
      currentPrice: 67.45,
      change: -0.95,
      changePercent: -1.39
    }
  ]
};

export const allStocks = Object.values(stocksBySector).flat();

export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return allStocks.find(stock => stock.symbol === symbol);
};
