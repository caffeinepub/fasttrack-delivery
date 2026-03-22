import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Package, Weight } from "lucide-react";
import type { Shipment } from "../backend";

interface Props {
  shipment: Shipment;
}

export default function MapCard({ shipment }: Props) {
  const [w, h, d] = shipment.dimensions;

  return (
    <Card className="shadow-card overflow-hidden" data-ocid="map.card">
      {/* Dark map area */}
      <div
        className="bg-map-bg relative overflow-hidden"
        style={{ height: 220 }}
      >
        {/* Grid lines */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="oklch(0.6 0.04 252)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Route SVG */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
          aria-label="Delivery route map"
          role="img"
        >
          <title>
            Delivery route from {shipment.origin} to {shipment.destination}
          </title>
          {/* Route path */}
          <path
            d="M 40 180 C 80 180 100 140 140 130 C 180 120 200 100 240 90 C 280 80 300 60 360 40"
            fill="none"
            stroke="oklch(0.68 0.12 185)"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          {/* Glow */}
          <path
            d="M 40 180 C 80 180 100 140 140 130 C 180 120 200 100 240 90 C 280 80 300 60 360 40"
            fill="none"
            stroke="oklch(0.68 0.12 185 / 0.3)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Origin pin */}
          <circle cx="40" cy="180" r="6" fill="oklch(0.67 0.16 162)" />
          <circle
            cx="40"
            cy="180"
            r="10"
            fill="none"
            stroke="oklch(0.67 0.16 162)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <text
            x="48"
            y="175"
            fill="white"
            fontSize="9"
            fontFamily="sans-serif"
            opacity="0.8"
          >
            {shipment.origin.split(",")[0]}
          </text>
          {/* Destination pin */}
          <circle cx="360" cy="40" r="6" fill="oklch(0.49 0.22 264)" />
          <circle
            cx="360"
            cy="40"
            r="10"
            fill="none"
            stroke="oklch(0.49 0.22 264)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <text
            x="330"
            y="35"
            fill="white"
            fontSize="9"
            fontFamily="sans-serif"
            opacity="0.8"
          >
            {shipment.destination.split(",")[0]}
          </text>
          {/* Truck marker */}
          <g transform="translate(225, 75)" className="animate-truck">
            <rect
              x="-14"
              y="-9"
              width="28"
              height="18"
              rx="4"
              fill="oklch(0.49 0.22 264)"
            />
            <text x="0" y="5" textAnchor="middle" fontSize="10" fill="white">
              🚚
            </text>
          </g>
        </svg>

        {/* Map label */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1">
          <span className="text-white/80 text-xs font-medium">Live Route</span>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base">Shipment Facts</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: Package,
              label: "Tracking",
              value: shipment.trackingNumber,
            },
            { icon: Weight, label: "Weight", value: `${shipment.weight} kg` },
            {
              icon: Box,
              label: "Dimensions",
              value: `${w}\u00d7${h}\u00d7${d} cm`,
            },
            { icon: Package, label: "Contents", value: shipment.contents },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <div className="mt-0.5 w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-sm font-semibold truncate max-w-[110px]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
