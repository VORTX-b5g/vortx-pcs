const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { items, customer } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Your cart is empty." });
        }

        const lineItems = items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(Number(item.price) * 100)
            },
            quantity: Number(item.qty)
        }));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,

            customer_email: customer.email,

            shipping_address_collection: {
                allowed_countries: ["US"]
            },

            success_url: `${req.headers.origin}/?payment=success`,
            cancel_url: `${req.headers.origin}/?payment=cancelled`
        });

        return res.status(200).json({
            url: session.url
        });

    } catch (error) {
        console.error("Stripe error:", error);

        return res.status(500).json({
            error: "Unable to create Stripe checkout session."
        });
    }
};
