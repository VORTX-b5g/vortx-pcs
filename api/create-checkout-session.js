const Stripe = require("stripe");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const { items, customer } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                error: "Your cart is empty."
            });
        }

        const lineItems = items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: item.details || undefined
                },
                unit_amount: Math.round(Number(item.price) * 100)
            },
            quantity: Number(item.qty)
        }));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: LineItems,

            customer_email: customer?.email || undefined,

            shipping_address_collection: {
                allowed_countries: ["US"]
            },

            success_url:
                "https://vortx-pcs.vercel.app/?payment=success",

            cancel_url:
                "https://vortx-pcs.vercel.app/?payment=cancelled"
        });

        return res.status(200).json({
            url: session.url
        });

    } catch (error) {
        console.error("Stripe checkout error:", error);

        return res.status(500).json({
            error:
                error.message ||
                "Unable to create checkout session."
        });
    }
};