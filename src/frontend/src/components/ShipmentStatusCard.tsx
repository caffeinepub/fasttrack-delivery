import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, MapPin, Package } from "lucide-react";
import type { Shipment } from "../backend";
import { ShipmentStatus } from "../backend";

const STATUS_STEPS = [
  { key: ShipmentStatus.orderPlaced, label: "Order Placed", icon: Package },
  { key: ShipmentStatus.pickedUp, label: "Picked Up", icon: MapPin },
  { key: ShipmentStatus.inTransit, label: "In Transit", icon: Clock },
  { key: ShipmentStatus.delivered, label: "Delivered", icon: CheckCircle2 },
];

const STATUS_ORDER: Record<ShipmentStatus, number> = {
  [ShipmentStatus.orderPlaced]: 0,
  [ShipmentStatus.pickedUp]: 1,
  [ShipmentStatus.inTransit]: 2,
  [ShipmentStatus.delivered]: 3,
};

function formatTs(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  shipment: Shipment;
}

export default function ShipmentStatusCard({ shipment }: Props) {
  const currentStep = STATUS_ORDER[shipment.status];
  const isDelivered = shipment.status === ShipmentStatus.delivered;

  return (
    <Card className="shadow-card" data-ocid="shipment_status.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              Tracking ID
            </p>
            <p className="text-lg font-bold text-foreground">
              {shipment.trackingNumber}
            </p>
          </div>
          <Badge
            className={
              isDelivered
                ? "bg-green/10 text-green border-green/20"
                : "bg-primary/10 text-primary border-primary/20"
            }
            variant="outline"
          >
            {isDelivered ? "Delivered" : "Active"}
          </Badge>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            {
              label: "Status",
              value: shipment.status.replace(/([A-Z])/g, " $1").trim(),
            },
            { label: "ETA", value: formatTs(shipment.estimatedArrival) },
            { label: "Origin", value: shipment.origin },
          ].map(({ label, value }) => (
            <div key={label} className="bg-secondary/60 rounded-lg p-2.5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                {label}
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {value}
              </p>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Stepper */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
          <div
            className="absolute left-4 top-4 w-0.5 bg-primary transition-all duration-700"
            style={{ height: `${(currentStep / 3) * 100}%` }}
          />

          <div className="space-y-6">
            {STATUS_STEPS.map((step, idx) => {
              const done = idx <= currentStep;
              const active = idx === currentStep;
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="flex items-center gap-4 relative"
                  data-ocid={`shipment_status.item.${idx + 1}`}
                >
                  <div className="relative z-10">
                    {active && !isDelivered ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse-ring" />
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : done ? (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-secondary border-2 border-border rounded-full flex items-center justify-center">
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </p>
                    {done && (
                      <p className="text-xs text-muted-foreground">
                        {formatTs(
                          idx === 0 ? shipment.createdAt : shipment.updatedAt,
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
