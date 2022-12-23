import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method is not allowed.' });
  }

  const lineItems = req.body.priceIds
    ? req.body.priceIds.map((priceId: string) => ({
        price: priceId,
        quantity: 1,
      }))
    : [];

  if (!lineItems.length) {
    return res.status(400).json({
      message: 'Price nor found.',
    });
  }

  const successUrl = `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.APP_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
