import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Star, Truck } from "lucide-react";
import type { Shipment } from "../backend";

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

interface Props {
  shipment: Shipment;
}

export default function DeliveryPersonCard({ shipment }: Props) {
  const initials = shipment.deliveryPersonName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const stars = Math.round(shipment.deliveryPersonRating);

  return (
    <Card className="shadow-card" data-ocid="delivery_person.card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Delivery Person</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 bg-primary text-white">
            <AvatarFallback className="bg-primary text-white font-bold text-base">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">
              {shipment.deliveryPersonName}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              {STAR_KEYS.map((key, i) => (
                <Star
                  key={key}
                  className={`w-3.5 h-3.5 ${
                    i < stars
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-border fill-border"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {shipment.deliveryPersonRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Truck className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {shipment.deliveryPersonVehicle}
              </span>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
          variant="outline"
          data-ocid="delivery_person.button"
        >
          <Phone className="w-4 h-4 mr-2" />
          Contact Driver
        </Button>
      </CardContent>
    </Card>
  );
}
