import { Button } from "@/components/ui/button";
import { Package, Search } from "lucide-react";

interface NavbarProps {
  onTrackClick: () => void;
}

export default function Navbar({ onTrackClick }: NavbarProps) {
  return (
    <header className="bg-navy w-full" data-ocid="navbar.section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-md">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            TrackSwift
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            data-ocid="navbar.link"
          >
            Home
          </a>
          <a
            href="/#track"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            data-ocid="navbar.link"
          >
            Track
          </a>
          <a
            href="/#support"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            data-ocid="navbar.link"
          >
            Support
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Search"
            data-ocid="navbar.search_input"
          >
            <Search className="w-5 h-5" />
          </button>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 font-semibold"
            onClick={onTrackClick}
            data-ocid="navbar.primary_button"
          >
            Track Package
          </Button>
        </div>
      </div>
    </header>
  );
}
