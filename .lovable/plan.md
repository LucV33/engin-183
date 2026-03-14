

## SQL Migration Plan

Run the provided SQL migration to create the deals/offers/escrow/shipments schema. This adds:

1. **4 new enum types**: `deal_status`, `offer_status`, `escrow_status`, `shipment_status`
2. **Alter `messages` table**: Add `message_type` (text, default 'text') and `metadata` (jsonb) columns
3. **4 new tables**:
   - `deals` (linked 1:1 to conversations)
   - `deal_offers` (linked to deals, tracks negotiation offers)
   - `deal_signatures` (linked to deals, tracks contract signatures)
   - `escrow_payments` (linked 1:1 to deals)
   - `shipments` (linked to deals)

### Implementation
- Execute the full SQL block as a single migration
- No RLS policies included in this migration (will need to be added separately)
- No code changes needed yet, just the schema

