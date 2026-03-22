import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { ActivityEvent } from "../backend";

function relativeTime(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  const diff = Date.now() - ms;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface Props {
  events: ActivityEvent[];
}

export default function ActivityTimeline({ events }: Props) {
  const sorted = [...events].sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : 1,
  );

  return (
    <Card className="shadow-card" data-ocid="activity.card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p
            className="text-sm text-muted-foreground"
            data-ocid="activity.empty_state"
          >
            No activity yet.
          </p>
        ) : (
          <div className="relative space-y-4">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
            {sorted.map((event, idx) => (
              <div
                key={`${String(event.timestamp)}-${idx}`}
                className="flex gap-4 relative"
                data-ocid={`activity.item.${idx + 1}`}
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-sm text-foreground font-medium leading-snug">
                    {event.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {relativeTime(event.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
