import { useMutation, useQuery } from "@tanstack/react-query";
import type { ActivityEvent, Shipment } from "../backend";
import { useActor } from "./useActor";

export function useGetShipmentByTracking(trackingNumber: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Shipment | null>({
    queryKey: ["shipment", trackingNumber],
    queryFn: async () => {
      if (!actor || !trackingNumber) return null;
      return actor.getShipmentByTracking(trackingNumber);
    },
    enabled: !!actor && !isFetching && !!trackingNumber,
  });
}

export function useGetActivity(trackingNumber: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<ActivityEvent[]>({
    queryKey: ["activity", trackingNumber],
    queryFn: async () => {
      if (!actor || !trackingNumber) return [];
      return actor.getActivity(trackingNumber);
    },
    enabled: !!actor && !isFetching && !!trackingNumber,
  });
}

export function useSeedDemoData() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.seedDemoData();
    },
  });
}
