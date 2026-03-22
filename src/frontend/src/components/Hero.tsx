import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Zap } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onTrack: (trackingNumber: string) => void;
  isLoading: boolean;
  defaultValue?: string;
}

export default function Hero({
  onTrack,
  isLoading,
  defaultValue = "",
}: HeroProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onTrack(value.trim());
  };

  const demoNumbers = ["FT-001", "FT-002", "FT-003"];

  return (
    <section
      className="w-full py-14 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.38 0.18 264) 0%, oklch(0.44 0.21 260) 100%)",
      }}
      data-ocid="hero.section"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
          <Zap className="w-3.5 h-3.5 text-yellow-300" />
          <span className="text-white/90 text-xs font-medium">
            Fastest Delivery Tracking
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
          Track Your Package
        </h1>
        <p className="text-white/70 text-base mb-8">
          Real-time updates. Instant location. Always on time.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="flex-1">
            <label
              htmlFor="tracking-input"
              className="block text-white/70 text-xs font-semibold uppercase tracking-wider text-left mb-1.5"
            >
              Enter Tracking Number:
            </label>
            <Input
              id="tracking-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. FT-001"
              className="bg-white/15 border-white/25 text-white placeholder:text-white/50 h-11 rounded-full px-4 focus:ring-2 focus:ring-white/40 focus:border-white/50"
              data-ocid="hero.input"
            />
          </div>
          <div className="sm:self-end">
            <Button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="w-full sm:w-auto h-11 px-7 bg-white text-primary hover:bg-white/90 font-bold rounded-full transition-all"
              data-ocid="hero.submit_button"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : null}
              TRACK
            </Button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-white/50 text-xs">Try:</span>
          {demoNumbers.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => {
                setValue(num);
                onTrack(num);
              }}
              className="text-xs bg-white/15 hover:bg-white/25 text-white/80 hover:text-white px-2.5 py-1 rounded-full transition-colors font-medium"
              data-ocid="hero.button"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
