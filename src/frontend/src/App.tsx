import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2, PackageSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ActivityTimeline from "./components/ActivityTimeline";
import DeliveryPersonCard from "./components/DeliveryPersonCard";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MapCard from "./components/MapCard";
import Navbar from "./components/Navbar";
import PackageDetailsCard from "./components/PackageDetailsCard";
import ShipmentStatusCard from "./components/ShipmentStatusCard";

import { useActor } from "./hooks/useActor";
import {
  useGetActivity,
  useGetShipmentByTracking,
  useSeedDemoData,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppInner() {
  const [trackingInput, setTrackingInput] = useState<string | null>(null);
  const { actor, isFetching: actorLoading } = useActor();
  const seedMutation = useSeedDemoData();
  const seededRef = useRef(false);

  const runSeed = useCallback(() => {
    if (!actor || actorLoading || seededRef.current) return;
    const alreadySeeded = localStorage.getItem("trackswift_seeded");
    if (!alreadySeeded) {
      seededRef.current = true;
      seedMutation.mutate(undefined, {
        onSuccess: () => {
          localStorage.setItem("trackswift_seeded", "1");
        },
      });
    }
  }, [actor, actorLoading, seedMutation]);

  useEffect(() => {
    runSeed();
  }, [runSeed]);

  const {
    data: shipment,
    isLoading: shipmentLoading,
    isError,
  } = useGetShipmentByTracking(trackingInput);
  const { data: activity = [] } = useGetActivity(trackingInput);

  const handleTrack = (num: string) => {
    setTrackingInput(num);
  };

  useEffect(() => {
    if (!shipmentLoading && trackingInput && shipment === null) {
      toast.error(`No shipment found for "${trackingInput}"`);
    }
  }, [shipment, shipmentLoading, trackingInput]);

  useEffect(() => {
    if (isError) toast.error("Failed to load shipment. Please try again.");
  }, [isError]);

  const isLoading = shipmentLoading || actorLoading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        onTrackClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <main className="flex-1">
        <Hero
          onTrack={handleTrack}
          isLoading={isLoading}
          defaultValue={trackingInput ?? ""}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <AnimatePresence>
            {isLoading && trackingInput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16 gap-3"
                data-ocid="dashboard.loading_state"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">
                  Fetching shipment details…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isLoading && trackingInput && shipment === null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-16 gap-3"
                data-ocid="dashboard.error_state"
              >
                <PackageSearch className="w-12 h-12 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground">
                  Shipment Not Found
                </p>
                <p className="text-sm text-muted-foreground">
                  No results for{" "}
                  <span className="font-mono text-primary">
                    {trackingInput}
                  </span>
                  . Try FT-001, FT-002, or FT-003.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!trackingInput && !isLoading && (
            <div
              className="flex flex-col items-center py-16 gap-3"
              data-ocid="dashboard.empty_state"
            >
              <PackageSearch className="w-12 h-12 text-muted-foreground/50" />
              <p className="text-base font-medium text-muted-foreground">
                Enter a tracking number above to get started
              </p>
              <p className="text-sm text-muted-foreground/70">
                Try: FT-001, FT-002, or FT-003
              </p>
            </div>
          )}

          <AnimatePresence>
            {!isLoading && shipment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <ShipmentStatusCard shipment={shipment} />
                  <MapCard shipment={shipment} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <PackageDetailsCard shipment={shipment} />
                  <DeliveryPersonCard shipment={shipment} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ActivityTimeline events={activity} />
                  <FAQAccordion />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
