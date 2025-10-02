import { TrendingUp, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === undefined;
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PSX Analyzer</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Stock Analysis</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#banking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Banking</a>
            <a href="#oil-gas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Oil & Gas</a>
            <a href="#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Technology</a>
            <a href="#textile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Textile</a>
            <a href="#cement" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cement</a>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary/60 transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
