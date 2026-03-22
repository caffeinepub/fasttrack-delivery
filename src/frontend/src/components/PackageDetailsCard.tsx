import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, MapPin } from "lucide-react";
import type { Shipment } from "../backend";

function formatTs(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

interface Props {
  shipment: Shipment;
}

export default function PackageDetailsCard({ shipment }: Props) {
  return (
    <Card className="shadow-card" data-ocid="package_details.card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Package Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Origin */}
        <div className="flex gap-3 items-start">
          <div className="mt-1 w-8 h-8 rounded-full bg-green/15 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-green" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              From
            </p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {shipment.origin}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatTs(shipment.createdAt)}
            </p>
          </div>
        </div>

        {/* Dashed connector */}
        <div className="ml-4 w-0.5 h-6 border-l-2 border-dashed border-border" />

        {/* Destination */}
        <div className="flex gap-3 items-start">
          <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Flag className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              To
            </p>
            <p className="text-sm font-bold text-foreground mt-0.5">
              {shipment.destination}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              ETA: {formatTs(shipment.estimatedArrival)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
