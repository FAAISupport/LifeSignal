# Paddle Migration Patch (LifeSignal)

This patch switches billing from Stripe Checkout to Paddle Checkout (overlay).

## Files added
- `lib/paddle.ts` - Paddle helpers + webhook signature verification
- `app/api/paddle/transaction/route.ts` - Creates Paddle transaction
- `app/api/paddle/webhook/route.ts` - Receives Paddle webhooks (signature verified)
- `app/checkout/PaddleCheckoutClient.tsx` - Loads Paddle.js and opens checkout
- `supabase/migrations/20251230_paddle_billing.sql` - Adds Paddle columns to `subscriptions`

## Files updated
- `app/checkout/page.tsx` - Uses Paddle checkout flow
- `lib/env.ts` - Adds Paddle env vars; Stripe becomes optional
- `README.md` - Adds Paddle setup instructions

## Paddle webhook events to enable
At minimum, subscribe your notification destination to:
- `transaction.completed`
- `subscription.created`
- `subscription.activated`
- `subscription.canceled`

## Important
Signature verification requires comparing the signature to the **raw body** of the request (do not JSON stringify/pretty print before verifying).
