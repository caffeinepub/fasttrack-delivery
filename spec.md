# FastTrack Delivery

## Current State
New project with no existing implementation.

## Requested Changes (Diff)

### Add
- Delivery tracking app where users enter a tracking number and see live shipment status
- Tracking lookup page with a prominent hero search input
- Shipment status card with progress stepper (Order Placed → Picked Up → In Transit → Delivered)
- Map-style visual with route and live location marker
- Package details: weight, dimensions, contents, source/destination addresses
- Delivery person info: name, rating, vehicle type, contact button
- Recent activity timeline showing timestamped events
- FAQ accordion section
- Admin side: ability to create/update shipments and their statuses
- Sample shipments pre-seeded for demo

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Shipment actor with CRUD for shipments, status updates, activity log entries
2. Frontend: Hero tracking input, shipment dashboard cards, stepper, timeline, FAQ
3. Seed sample shipments for demo purposes
