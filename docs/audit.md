# API Audit

All documented endpoints have been reviewed for compliance against documentation on SwaggerHub.
    In some cases, implementation will vary slightly from docs,
        but this has been approved ahead of time if marked Compliant in this document.

## GET `/account/`
Owner: Jeffrey (reassigned)
- Compliant!
- Created `backwardsAccountGen(apiObj)` to assist; may be useful elsewhere.

## PATCH `/account/`
Owner: Jeffrey (reassigned)
- Compliant!
    - Please note that plain-text password storage is now deprecated and will result in reduced session lifetimes.

## POST `/account/login/`
Owner: Jeffrey (reassigned)
- Compliant!

## GET `/account/all/`
Owner: Kartik
- ⚠ Missing.

## POST `/account/create/`
Owner: Chris (originally)
- Changed password behavior, who can create accounts.
- Compliant!

## GET `/hotel/`
Owner: Kartik
- URL fixed a bit.
- Use ErrorGen.
- Actually returned stuff.

## PATCH `/hotel/`
Owner: Kartik
- ⚠ Missing.

## GET `/room/:room_id`
Owner: Johnny (on behalf of Chris)
- Compliant!

## POST `/room/:room_id`
Owner: Chris
- 🔃 Pending audit.

## PATCH `/room/:room_id`
Owner: Chris
- 🔃 Pending audit.

## DELETE `/room/:room_id`
Owner: Chris
- 🔃 Pending audit.

## GET `/floor/:floor_number`
Owner: Chris
- 🔃 Pending audit.

## POST `/inventory/`
Owner: Jeffrey
- Needed incremention code. **Was resolved.**
    - Required overhauling because MongoDB deprecations and bugs with original SO code.

## PATCH `/inventory/:inventory_id`
Owner: Jeffrey
- Needed some output fixes.

## DELETE `/inventory/:inventory_id`
Owner: Jeffrey
- Compliant!

## GET `/room/`
Owner: Johnny
- ⚠ Missing!

## GET `/inventory/`
Owner: Johnny
- Compliant!

## GET `/inventory/:inventory_id/:quantity`
Owner: Johnny
- ⚠ Missing!

## GET `/inventory/:inventory_id`
Owner: Jeffrey (on behalf of Johnny)
- Returned a single-item array. **Resolved.**

## GET `/orders/unclaimed/`
📌 Assigned to Johnny.

## GET `/orders/my/`
📌 Assigned to Johnny.

## GET `/orders/claim/:order_id`
📌 Assigned to Kartik.

## GET `/orders/claim/:fulfill`
📌 Assigned to Kartik.
