import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";

actor {
  type ShipmentStatus = {
    #orderPlaced;
    #pickedUp;
    #inTransit;
    #delivered;
  };

  type Shipment = {
    id : Nat;
    trackingNumber : Text;
    status : ShipmentStatus;
    estimatedArrival : Time.Time;
    origin : Text;
    destination : Text;
    weight : Float;
    dimensions : (Float, Float, Float);
    contents : Text;
    deliveryPersonName : Text;
    deliveryPersonRating : Float;
    deliveryPersonVehicle : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type ActivityEvent = {
    message : Text;
    timestamp : Time.Time;
  };

  module ActivityEvent {
    public func compare(a : ActivityEvent, b : ActivityEvent) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  // Storage
  let shipments = Map.empty<Text, Shipment>();
  let activities = Map.empty<Text, [ActivityEvent]>();

  // Helper to get next shipment id
  var nextId = 1;

  // Pre-seed demo data
  public shared ({ caller }) func seedDemoData() : async () {
    let now = Time.now();

    let shipment1 : Shipment = {
      id = nextId;
      trackingNumber = "FTD123456";
      status = #orderPlaced;
      estimatedArrival = now + 3600_000_000_000; // 1 hour from now
      origin = "Warehouse A";
      destination = "Customer B";
      weight = 2.5;
      dimensions = (30.0, 20.0, 10.0);
      contents = "Electronics";
      deliveryPersonName = "John Doe";
      deliveryPersonRating = 4.8;
      deliveryPersonVehicle = "Van";
      createdAt = now;
      updatedAt = now;
    };

    shipments.add(shipment1.trackingNumber, shipment1);

    let activity1 = [{ message = "Order placed."; timestamp = now }];
    activities.add(shipment1.trackingNumber, activity1);

    // Add more shipments and activities if needed
    nextId += 1;
  };

  // Create new shipment
  public shared ({ caller }) func createShipment(shipment : Shipment) : async () {
    let newShipment : Shipment = {
      shipment with
      id = nextId;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    shipments.add(shipment.trackingNumber, newShipment);
    activities.add(shipment.trackingNumber, []);
    nextId += 1;
  };

  // Get shipment by tracking number
  public query ({ caller }) func getShipmentByTracking(trackingNumber : Text) : async ?Shipment {
    shipments.get(trackingNumber);
  };

  // Get all shipments
  public query ({ caller }) func getAllShipments() : async [Shipment] {
    shipments.values().toArray();
  };

  // Update shipment status
  public shared ({ caller }) func updateShipmentStatus(trackingNumber : Text, newStatus : ShipmentStatus) : async () {
    let shipment = switch (shipments.get(trackingNumber)) {
      case (null) { Runtime.trap("Shipment not found") };
      case (?s) { s };
    };

    let updatedShipment : Shipment = {
      shipment with
      status = newStatus;
      updatedAt = Time.now();
    };

    shipments.add(trackingNumber, updatedShipment);

    let statusMessage = switch (newStatus) {
      case (#orderPlaced) { "Order placed." };
      case (#pickedUp) { "Shipment picked up." };
      case (#inTransit) { "Shipment in transit." };
      case (#delivered) { "Shipment delivered." };
    };

    let newEvent = {
      message = statusMessage;
      timestamp = Time.now();
    };

    let currentActivities = switch (activities.get(trackingNumber)) {
      case (null) { [] };
      case (?acts) { acts };
    };

    activities.add(trackingNumber, currentActivities.concat([newEvent]));
  };

  // Add activity entry
  public shared ({ caller }) func addActivityEntry(trackingNumber : Text, message : Text) : async () {
    let newEvent = {
      message;
      timestamp = Time.now();
    };

    let currentActivities = switch (activities.get(trackingNumber)) {
      case (null) { [] };
      case (?acts) { acts };
    };

    activities.add(trackingNumber, currentActivities.concat([newEvent]));
  };

  // Get activity for shipment
  public query ({ caller }) func getActivity(trackingNumber : Text) : async [ActivityEvent] {
    switch (activities.get(trackingNumber)) {
      case (null) { Runtime.trap("No activity found for shipment") };
      case (?events) { events.sort() };
    };
  };
};
