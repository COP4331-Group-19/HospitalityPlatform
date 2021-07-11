# API Audit

## GET `/account/`
Owner: Jeffrey (reassigned)
- Missing.

## PATCH `/account/`
Owner: Jeffrey (reassigned)
- Missing.

## POST `/account/login/`
Owner: Jeffrey (reassigned)
- Compliant!

## GET `/account/all/`
Owner: Kartik
- Missing.

## POST `/account/create/`
Owner: Chris (originally)
- Work in progress.

## GET `/hotel/`
Owner: Kartik
- URL fixed a bit.
- Use ErrorGen.
- Actually returned stuff.

## PATCH `/hotel/`
Owner: Kartik
- Missing.

## GET `/room/:room_id`
Owner: Johnny (on behalf of Chris)
- Compliant!

## POST `/room/:room_id`
Owner: Chris
- Missing.

## PATCH `/room/:room_id`
Owner: Chris
- Missing.

## DELETE `/room/:room_id`
Owner: Chris
- Missing.

## GET `/floor/:floor_number`
Owner: Chris
- Missing.

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
Owner: Jeffrey
- Missing!

## GET `/inventory/`
Owner: Johnny
- Compliant!

## GET `/inventory/:inventory_id/:quantity`
Owner: Johnny
- Missing!

## GET `/inventory/:inventory_id`
Owner: Jeffrey (on behalf of Johnny)
- Returned a single-item array. **Resolved.**

## GET `/orders/unclaimed/`
Assigned to Johnny.

## GET `/orders/my/`
Assigned to Johnny.

## GET `/orders/claim/:order_id`
Assigned to Kartik.

## GET `/orders/claim/:fulfill`
Assigned to Kartik.
