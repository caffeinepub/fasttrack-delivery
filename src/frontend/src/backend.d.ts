import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ActivityEvent {
    message: string;
    timestamp: Time;
}
export interface Shipment {
    id: bigint;
    weight: number;
    status: ShipmentStatus;
    trackingNumber: string;
    destination: string;
    deliveryPersonRating: number;
    contents: string;
    createdAt: Time;
    origin: string;
    updatedAt: Time;
    deliveryPersonName: string;
    deliveryPersonVehicle: string;
    dimensions: [number, number, number];
    estimatedArrival: Time;
}
export enum ShipmentStatus {
    orderPlaced = "orderPlaced",
    inTransit = "inTransit",
    pickedUp = "pickedUp",
    delivered = "delivered"
}
export interface backendInterface {
    addActivityEntry(trackingNumber: string, message: string): Promise<void>;
    createShipment(shipment: Shipment): Promise<void>;
    getActivity(trackingNumber: string): Promise<Array<ActivityEvent>>;
    getAllShipments(): Promise<Array<Shipment>>;
    getShipmentByTracking(trackingNumber: string): Promise<Shipment | null>;
    seedDemoData(): Promise<void>;
    updateShipmentStatus(trackingNumber: string, newStatus: ShipmentStatus): Promise<void>;
}
