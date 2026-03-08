

## Build Deal Collaboration System

This is a large feature. The existing schema already has `deals`, `deal_offers`, `deal_signatures`, `escrow_payments`, `shipments`, and `messages` tables with RLS policies and realtime enabled. The request asks for additional tables/columns (contracts, analytics) and a full UI system.

### Phase 1: Database Migration

The existing schema is close but needs additions:

1. **New `live_analytics` table** — stream results submitted by creator (stream_link, peak_viewers, total_viewers, gmv, orders, likes, watch_time_avg, submitted_at, approved_at)
2. **New `contracts` table** — auto-generated terms (terms jsonb, brand_signed_at, creator_signed_at, pdf_url)
3. **Alter `deals` table** — add `rate` (numeric), `deliverables` (text), `live_date` (timestamp), `usage_rights` (text[]) columns. Existing status enum needs expanding to include: `contracted`, `funded`, `shipped`, `delivered`, `live`, `completed`, `disputed` (current enum: negotiating, agreed, signed, escrow_funded, in_progress, completed, cancelled — will need to add missing values)
4. **Alter `deal_offers` table** — add `deliverables` (text), `live_date` (timestamp), `usage_rights` (text[]) columns to support rich offer cards
5. **RLS policies** for new tables (same conversation-participant pattern)
6. **Enable realtime** for `live_analytics` and `contracts`

### Phase 2: Deal Room UI (the core feature)

**New page: `/deals/:id`** — Single deal workspace with tabbed layout:

- **Chat tab** (default): Left panel (30%) = deal summary card with status-aware CTA button. Right panel (70%) = chat timeline with system event cards rendered inline, offer cards with Accept/Counter buttons, and message input.
- **Contract tab**: Formatted contract view with e-sign (type name + click Sign). Shows signature status for both parties.
- **Shipment tab**: Tracking number entry (brand), carrier selection, visual stepper (Label Created → In Transit → Delivered), "Mark as Received" button (creator).
- **Analytics tab**: Creator submits stream metrics form. Brand reviews and approves. 4 stat cards + bar chart display.

**Key components to build:**
- `DealRoom.tsx` — main page with tabs
- `DealSummaryPanel.tsx` — left panel with status badge, rate, deliverables, CTA
- `DealChat.tsx` — chat timeline with realtime subscription
- `OfferCard.tsx` — rich offer card (rate, deliverables, live date, usage rights) with Accept/Counter
- `ContractView.tsx` — formatted contract with e-sign
- `ShipmentTracker.tsx` — visual stepper + tracking input
- `AnalyticsTab.tsx` — submission form + stats dashboard
- `SystemEventCard.tsx` — inline system messages with icons

### Phase 3: Deal Inbox

**New page: `/deals`** — List of all deals for current user.

- Each row: other party avatar + name, status badge, last message preview, rate, unread count
- Tabs: All | Active | Completed | Disputed
- "New Deal" button (brand only) → routes to creator feed

### Phase 4: Negotiation Flow

- On `CreatorDetail.tsx`, add "Send Offer" button (brand only) that opens offer modal
- Offer creates a conversation (if none exists), creates a deal record, and sends an offer-type message
- Counter-offer re-renders the offer card pre-filled with edits
- Accept → creates contract record → status = "contracted" → system message

### Phase 5: Contract Signing

- Auto-generate contract terms from agreed deal (rate, deliverables, live_date, usage_rights)
- E-sign: type full name + click Sign → saves to `deal_signatures` + timestamps on `contracts`
- Both signed → status = "contracted" → system message prompting escrow funding

### Phase 6: Escrow (Stripe placeholder)

- "Fund Escrow" button for brand (contracted status)
- For now: simulated flow — clicking creates escrow record with status "held", updates deal to "funded"
- System message confirms escrow funding
- Release triggered when brand approves analytics
- **Note**: Full Stripe integration (PaymentIntents with manual capture) will need Stripe connector enabled separately. This phase builds the UI and flow with placeholder payment logic.

### Phase 7: Shipment Tracking

- Brand enters tracking number + carrier from dropdown (UPS, FedEx, USPS, DHL)
- Visual stepper component showing shipment progress
- Brand can manually update status
- Creator sees "Mark as Received" → status = "delivered" → system message

### Phase 8: Analytics Submission

- Creator submits: stream URL, peak viewers, total viewers, GMV, orders, likes, avg watch time
- Brand reviews: 4 stat cards (GMV, Orders, Peak Viewers, Total Viewers) + bar chart
- Brand approves → triggers escrow release → deal completed
- "Open Dispute" button → placeholder modal

### Routing Changes in App.tsx

```text
/deals           → DealInbox (protected)
/deals/:id       → DealRoom (protected, tabs handle contract/shipment/analytics)
```

### Nav Update

Add "Deals" link to AppLayout nav bar (with Handshake icon).

### File Structure

```text
src/
  pages/
    DealInbox.tsx
    DealRoom.tsx
  components/
    deals/
      DealSummaryPanel.tsx
      DealChat.tsx
      OfferCard.tsx
      OfferModal.tsx
      ContractView.tsx
      ShipmentTracker.tsx
      AnalyticsTab.tsx
      SystemEventCard.tsx
      StatusBadge.tsx
```

### Implementation Order

1. Run database migration (new tables + alter existing)
2. Build DealInbox page
3. Build DealRoom with chat tab + realtime
4. Build OfferCard + negotiation flow
5. Build ContractView + signing
6. Build ShipmentTracker
7. Build AnalyticsTab
8. Add escrow placeholder flow
9. Update CreatorDetail with "Send Offer"
10. Update AppLayout nav + App.tsx routes
11. Wire up status-based CTA logic

### Technical Notes

- The existing `deals` table uses `conversation_id` as FK. The request wants `brand_id` / `creator_id` directly — these can be derived from the conversation record, so we keep the existing FK pattern and join through conversations.
- `deal_offers` already has rate fields (`hourly_rate`, `hours`, `commission_percentage`). We'll add `deliverables`, `live_date`, `usage_rights` to support the richer offer card format. The `rate` field on `deals` will be a simple flat rate (replacing the hourly model for this flow).
- Status enum needs expanding — we'll alter the existing `deal_status` enum to add new values.
- Realtime subscriptions will use the existing `supabase_realtime` publication (messages and deals already added).

