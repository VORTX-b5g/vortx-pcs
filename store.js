// VORTX PCS - Store

const CART_KEY = "vortx-cart";
const FREE_SHIPPING_OVER = 500;
const SHIPPING_FLAT = 25;
const TAX_RATE = 0.08;

const products = [
    { id: "vortx-core", name: "VORTX CORE", category: "Prebuilts", price: 699, stock: 6, featured: true, badge: "PREBUILT", blurb: "Ryzen 5 / RX 7600 — great entry-level 1080p gaming.", preset: "core" },
    { id: "vortx-pro", name: "VORTX PRO", category: "Prebuilts", price: 999, stock: 4, featured: true, badge: "BEST SELLER", blurb: "Ryzen 5 / RX 7700 XT — high-refresh 1440p gaming.", preset: "pro" },
    { id: "vortx-ultra", name: "VORTX ULTRA", category: "Prebuilts", price: 1499, stock: 2, featured: true, badge: "FLAGSHIP", blurb: "Ryzen 7 X3D / RX 7800 XT — maximum performance.", preset: "ultra" },

    { id: "r5-5600", name: "AMD Ryzen 5 5600", category: "CPUs", price: 120, stock: 18, blurb: "6 cores / 12 threads, AM4, 65W." },
    { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", category: "CPUs", price: 300, stock: 5, blurb: "8 cores with 3D V-Cache, the AM4 gaming king." },
    { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", category: "CPUs", price: 305, stock: 7, featured: true, blurb: "8 cores, AM5, the best gaming CPU per watt." },
    { id: "r9-9950x", name: "AMD Ryzen 9 9950X", category: "CPUs", price: 550, stock: 3, blurb: "16 cores / 32 threads for gaming and heavy workloads." },
    { id: "i5-12400f", name: "Intel Core i5-12400F", category: "CPUs", price: 110, stock: 14, blurb: "6 cores, LGA1700, superb budget gaming value." },
    { id: "i7-14700k", name: "Intel Core i7-14700K", category: "CPUs", price: 380, stock: 6, blurb: "20 cores, unlocked, LGA1700." },

    { id: "rx-7600", name: "Radeon RX 7600", category: "GPUs", price: 250, stock: 11, blurb: "8GB — solid 1080p ultra performance." },
    { id: "rx-7700xt", name: "Radeon RX 7700 XT", category: "GPUs", price: 400, stock: 8, featured: true, blurb: "12GB — high-refresh 1440p." },
    { id: "rx-7800xt", name: "Radeon RX 7800 XT", category: "GPUs", price: 500, stock: 4, blurb: "16GB — 1440p ultra and entry 4K." },

    { id: "b550", name: "B550 Motherboard", category: "Motherboards", price: 100, stock: 12, blurb: "AM4, DDR4, PCIe 4.0, ATX." },
    { id: "b650", name: "B650 Motherboard", category: "Motherboards", price: 150, stock: 9, blurb: "AM5, DDR5, PCIe 4.0, ATX." },
    { id: "x670", name: "X670 Motherboard", category: "Motherboards", price: 220, stock: 3, blurb: "AM5, DDR5, PCIe 5.0, premium VRMs." },
    { id: "z790", name: "Z790 Motherboard", category: "Motherboards", price: 210, stock: 5, blurb: "LGA1700, DDR5, overclocking ready." },

    { id: "ddr4-16", name: "16GB DDR4 3600", category: "Memory", price: 50, stock: 24, blurb: "2 x 8GB kit, CL18." },
    { id: "ddr4-32", name: "32GB DDR4 3600", category: "Memory", price: 80, stock: 15, blurb: "2 x 16GB kit, CL18." },
    { id: "ddr5-32", name: "32GB DDR5 6000", category: "Memory", price: 110, stock: 10, featured: true, blurb: "2 x 16GB kit, CL30, EXPO." },

    { id: "nvme-1tb", name: "1TB NVMe SSD", category: "Storage", price: 60, stock: 30, blurb: "PCIe 4.0, up to 5,000 MB/s." },
    { id: "nvme-2tb", name: "2TB NVMe SSD", category: "Storage", price: 100, stock: 16, blurb: "PCIe 4.0, up to 7,000 MB/s." },
    { id: "nvme-4tb", name: "4TB NVMe SSD", category: "Storage", price: 170, stock: 4, blurb: "PCIe 4.0, for large game libraries." },

    { id: "psu-650", name: "650W PSU", category: "Power", price: 70, stock: 20, blurb: "80+ Bronze, fully modular." },
    { id: "psu-750", name: "750W PSU", category: "Power", price: 90, stock: 13, blurb: "80+ Gold, fully modular." },
    { id: "psu-850", name: "850W PSU", category: "Power", price: 130, stock: 6, blurb: "80+ Gold, ATX 3.0 ready." },

    { id: "case-airflow", name: "VORTX Airflow", category: "Cases", price: 70, stock: 9, blurb: "Mesh front, 3 fans included." },
    { id: "case-glass", name: "VORTX Glass", category: "Cases", price: 100, stock: 7, blurb: "Tempered glass, fits 240mm radiators." },
    { id: "case-elite", name: "VORTX Elite", category: "Cases", price: 150, stock: 2, blurb: "Dual chamber, fits 360mm radiators." },

    { id: "cooler-air", name: "Air Cooler", category: "Cooling", price: 35, stock: 22, blurb: "Tower cooler rated to 95W." },
    { id: "aio-240", name: "240mm AIO", category: "Cooling", price: 80, stock: 8, blurb: "Liquid cooling rated to 180W." },
    { id: "aio-360", name: "360mm AIO", category: "Cooling", price: 120, stock: 0, blurb: "Liquid cooling rated to 300W." },

    { id: "diagnostic", name: "Diagnostic & Clean", category: "Services", price: 49, stock: 99, blurb: "Full health check, dust removal, thermal paste refresh." },
    { id: "os-install", name: "OS & Driver Setup", category: "Services", price: 79, stock: 99, blurb: "Windows install, drivers, updates and tuning." },
    { id: "upgrade-fit", name: "Upgrade Fitting", category: "Services", price: 99, stock: 99, blurb: "We install your new parts and validate the build." }
];

const productsById = Object.fromEntries(products.map(p => [p.id, p]));
const categories = ["All", ...new Set(products.map(p => p.category))];

const grid = document.getElementById("product-grid");
const filtersBox = document.getElementById("filters");
const searchInput = document.getElementById("store-search");
const sortSelect = document.getElementById("store-sort");
const storeCount = document.getElementById("store-count");
<<<<<<< HEAD
=======

>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
const cartPanel = document.getElementById("cart");
const cartItemsBox = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const overlay = document.getElementById("overlay");
const checkoutModal = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const checkoutError = document.getElementById("checkout-error");
const orderConfirmation = document.getElementById("order-confirmation");

let activeCategory = "All";
let cart = loadCart();

function money(amount) {
<<<<<<< HEAD
    return `$${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
=======
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
}

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
<<<<<<< HEAD
        return Array.isArray(saved)
            ? saved.filter(line => line && line.id && line.qty > 0)
            : [];
=======
        return Array.isArray(saved) ? saved.filter(line => line && line.id && line.qty > 0) : [];
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function lineProduct(line) {
    return productsById[line.id] || line.custom;
}

function stockFor(line) {
    const product = productsById[line.id];
    return product ? product.stock : Infinity;
}

function cartTotals() {
<<<<<<< HEAD
    const subtotal = cart.reduce(
        (sum, line) => sum + lineProduct(line).price * line.qty,
        0
    );

    const shipping =
        subtotal === 0 || subtotal >= FREE_SHIPPING_OVER
            ? 0
            : SHIPPING_FLAT;

    const tax = subtotal * TAX_RATE;

    return {
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax
    };
=======
    const subtotal = cart.reduce((sum, line) => sum + lineProduct(line).price * line.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
    const tax = subtotal * TAX_RATE;

    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
}

function addToCart(id, product) {
    const line = cart.find(entry => entry.id === id);
    const stock = product ? Infinity : productsById[id].stock;

    if (line) {
        if (line.qty >= stock) return false;
        line.qty += 1;
    } else {
<<<<<<< HEAD
        cart.push(
            product
                ? { id, qty: 1, custom: product }
                : { id, qty: 1 }
        );
=======
        cart.push(product ? { id, qty: 1, custom: product } : { id, qty: 1 });
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
    }

    saveCart();
    renderCart();
    renderProducts();
<<<<<<< HEAD

=======
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
    return true;
}

function setQty(id, qty) {
    const line = cart.find(entry => entry.id === id);
    if (!line) return;

    const capped = Math.min(qty, stockFor(line));

    if (capped <= 0) {
        cart = cart.filter(entry => entry.id !== id);
    } else {
        line.qty = capped;
    }

    saveCart();
    renderCart();
    renderProducts();
}

function visibleProducts() {
    const query = searchInput.value.trim().toLowerCase();

    let list = products.filter(product => {
<<<<<<< HEAD
        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const matchesQuery =
            !query ||
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.blurb.toLowerCase().includes(query);
=======
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesQuery = !query
            || product.name.toLowerCase().includes(query)
            || product.category.toLowerCase().includes(query)
            || product.blurb.toLowerCase().includes(query);
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        return matchesCategory && matchesQuery;
    });

    const sort = sortSelect.value;

<<<<<<< HEAD
    if (sort === "price-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        list.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        list.sort(
            (a, b) =>
                Number(Boolean(b.featured)) -
                Number(Boolean(a.featured))
        );
    }
=======
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

    return list;
}

function renderFilters() {
    filtersBox.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
<<<<<<< HEAD

        button.type = "button";
        button.className =
            "filter" +
            (category === activeCategory ? " active" : "");

        button.textContent = category.toUpperCase();
        button.setAttribute(
            "aria-pressed",
            String(category === activeCategory)
        );
=======
        button.type = "button";
        button.className = "filter" + (category === activeCategory ? " active" : "");
        button.textContent = category.toUpperCase();
        button.setAttribute("aria-pressed", String(category === activeCategory));
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        button.addEventListener("click", () => {
            activeCategory = category;
            renderFilters();
            renderProducts();
        });

        filtersBox.appendChild(button);
    });
}

function renderProducts() {
    const list = visibleProducts();

    grid.innerHTML = "";

    if (list.length === 0) {
<<<<<<< HEAD
        storeCount.textContent =
            "No products match your search.";
        return;
    }

    storeCount.textContent =
        `${list.length} product${list.length === 1 ? "" : "s"}`;

    list.forEach(product => {
        const inCart =
            cart.find(line => line.id === product.id)?.qty || 0;

=======
        storeCount.textContent = "No products match your search.";
        return;
    }

    storeCount.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;

    list.forEach(product => {
        const inCart = cart.find(line => line.id === product.id)?.qty || 0;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        const soldOut = product.stock === 0;
        const maxed = inCart >= product.stock;

        const card = document.createElement("article");
<<<<<<< HEAD
        card.className =
            "product" +
            (product.featured ? " featured" : "");
=======
        card.className = "product" + (product.featured ? " featured" : "");
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        const head = document.createElement("div");
        head.className = "product-head";

        const name = document.createElement("h3");
        name.textContent = product.name;
<<<<<<< HEAD

=======
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        head.appendChild(name);

        if (product.badge) {
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = product.badge;
            head.appendChild(badge);
        }

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const blurb = document.createElement("p");
        blurb.className = "product-blurb";
        blurb.textContent = product.blurb;

        const stock = document.createElement("p");
<<<<<<< HEAD
        stock.className =
            "stock" +
            (soldOut
                ? " out"
                : product.stock <= 4
                    ? " low"
                    : "");

=======
        stock.className = "stock" + (soldOut ? " out" : product.stock <= 4 ? " low" : "");
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        stock.textContent = soldOut
            ? "Out of stock"
            : product.stock <= 4
                ? `Only ${product.stock} left`
                : "In stock";

        const price = document.createElement("strong");
        price.className = "product-price";
<<<<<<< HEAD
        price.textContent =
            `$${product.price.toLocaleString()}`;
=======
        price.textContent = `$${product.price.toLocaleString()}`;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        const actions = document.createElement("div");
        actions.className = "product-actions";

        const add = document.createElement("button");
        add.type = "button";
        add.className = "add-button";
        add.disabled = soldOut || maxed;
<<<<<<< HEAD

=======
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        add.textContent = soldOut
            ? "SOLD OUT"
            : maxed
                ? "MAX IN CART"
                : inCart
                    ? `ADD ANOTHER (${inCart})`
                    : "ADD TO CART";

        add.addEventListener("click", () => {
            addToCart(product.id);
            openCart();
        });

        actions.appendChild(add);

        if (product.preset) {
<<<<<<< HEAD
            const configure =
                document.createElement("button");

            configure.type = "button";
            configure.className = "ghost-button";
            configure.textContent = "CUSTOMISE";

            configure.addEventListener(
                "click",
                () => window.applyPreset?.(product.preset)
            );

            actions.appendChild(configure);
        }

        card.append(
            head,
            category,
            blurb,
            stock,
            price,
            actions
        );

=======
            const configure = document.createElement("button");
            configure.type = "button";
            configure.className = "ghost-button";
            configure.textContent = "CUSTOMISE";
            configure.addEventListener("click", () => window.applyPreset?.(product.preset));
            actions.appendChild(configure);
        }

        card.append(head, category, blurb, stock, price, actions);
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        grid.appendChild(card);
    });
}

function renderCart() {
    cartItemsBox.innerHTML = "";

<<<<<<< HEAD
    const itemCount = cart.reduce(
        (sum, line) => sum + line.qty,
        0
    );

    cartCount.textContent = String(itemCount);
    cartCount.classList.toggle(
        "filled",
        itemCount > 0
    );
=======
    const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);
    cartCount.textContent = String(itemCount);
    cartCount.classList.toggle("filled", itemCount > 0);
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

    if (cart.length === 0) {
        const empty = document.createElement("p");
        empty.className = "cart-empty";
        empty.textContent = "Your cart is empty.";
        cartItemsBox.appendChild(empty);
    }

    cart.forEach(line => {
        const product = lineProduct(line);

        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("strong");
        name.textContent = product.name;

        const each = document.createElement("span");
<<<<<<< HEAD
        each.textContent =
            `${money(product.price)} each`;
=======
        each.textContent = `${money(product.price)} each`;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        info.append(name, each);

        if (product.details) {
            const details = document.createElement("span");
            details.className = "cart-item-details";
            details.textContent = product.details;
            info.appendChild(details);
        }

        const controls = document.createElement("div");
        controls.className = "qty";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
<<<<<<< HEAD
        minus.setAttribute(
            "aria-label",
            `Decrease quantity of ${product.name}`
        );

        minus.addEventListener(
            "click",
            () => setQty(line.id, line.qty - 1)
        );
=======
        minus.setAttribute("aria-label", `Decrease quantity of ${product.name}`);
        minus.addEventListener("click", () => setQty(line.id, line.qty - 1));
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        const qty = document.createElement("span");
        qty.textContent = String(line.qty);

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
<<<<<<< HEAD
        plus.disabled =
            line.qty >= stockFor(line);

        plus.setAttribute(
            "aria-label",
            `Increase quantity of ${product.name}`
        );

        plus.addEventListener(
            "click",
            () => setQty(line.id, line.qty + 1)
        );
=======
        plus.disabled = line.qty >= stockFor(line);
        plus.setAttribute("aria-label", `Increase quantity of ${product.name}`);
        plus.addEventListener("click", () => setQty(line.id, line.qty + 1));
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        controls.append(minus, qty, plus);

        const lineTotal = document.createElement("strong");
        lineTotal.className = "cart-item-total";
<<<<<<< HEAD
        lineTotal.textContent =
            money(product.price * line.qty);
=======
        lineTotal.textContent = money(product.price * line.qty);
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove";
        remove.textContent = "Remove";
<<<<<<< HEAD

        remove.addEventListener(
            "click",
            () => setQty(line.id, 0)
        );

        row.append(
            info,
            controls,
            lineTotal,
            remove
        );

        cartItemsBox.appendChild(row);
    });

    const {
        subtotal,
        shipping,
        tax,
        total
    } = cartTotals();

    document.getElementById("cart-subtotal").textContent =
        money(subtotal);

    document.getElementById("cart-shipping").textContent =
        shipping === 0 && subtotal > 0
            ? "FREE"
            : money(shipping);

    document.getElementById("cart-tax").textContent =
        money(tax);

    document.getElementById("cart-total").textContent =
        money(total);

    document.getElementById("checkout-total").textContent =
        money(total);

    const remaining =
        FREE_SHIPPING_OVER - subtotal;

    document.getElementById("cart-note").textContent =
        subtotal > 0 && remaining > 0
            ? `Spend ${money(remaining)} more for free shipping.`
            : "Free shipping on orders over $500.";

    document.getElementById("checkout-button").disabled =
        cart.length === 0;
=======
        remove.addEventListener("click", () => setQty(line.id, 0));

        row.append(info, controls, lineTotal, remove);
        cartItemsBox.appendChild(row);
    });

    const { subtotal, shipping, tax, total } = cartTotals();

    document.getElementById("cart-subtotal").textContent = money(subtotal);
    document.getElementById("cart-shipping").textContent = shipping === 0 && subtotal > 0 ? "FREE" : money(shipping);
    document.getElementById("cart-tax").textContent = money(tax);
    document.getElementById("cart-total").textContent = money(total);
    document.getElementById("checkout-total").textContent = money(total);

    const remaining = FREE_SHIPPING_OVER - subtotal;
    document.getElementById("cart-note").textContent = subtotal > 0 && remaining > 0
        ? `Spend ${money(remaining)} more for free shipping.`
        : "Free shipping on orders over $500.";

    document.getElementById("checkout-button").disabled = cart.length === 0;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
}

function openCart() {
    cartPanel.classList.add("open");
    cartPanel.removeAttribute("inert");
    overlay.hidden = false;
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartPanel.setAttribute("inert", "");
    overlay.hidden = true;
}

function openCheckout() {
    if (cart.length === 0) return;

    checkoutError.textContent = "";
    orderConfirmation.hidden = true;
    checkoutForm.hidden = false;
    checkoutModal.hidden = false;
    overlay.hidden = false;
<<<<<<< HEAD

=======
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
    document.getElementById("co-name").focus();
}

function closeCheckout() {
    checkoutModal.hidden = true;
<<<<<<< HEAD

    if (!cartPanel.classList.contains("open")) {
        overlay.hidden = true;
    }
}

function orderNumber() {
    return `VX-${Date.now()
        .toString(36)
        .toUpperCase()
        .slice(-6)}`;
}

async function placeOrder(event) {
=======
    if (!cartPanel.classList.contains("open")) overlay.hidden = true;
}

function orderNumber() {
    return `VX-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function placeOrder(event) {
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
    event.preventDefault();

    const name = document.getElementById("co-name").value.trim();
    const email = document.getElementById("co-email").value.trim();
    const address = document.getElementById("co-address").value.trim();

    if (!name || !address) {
<<<<<<< HEAD
        checkoutError.textContent =
            "Please fill in your name and shipping address.";
=======
        checkoutError.textContent = "Please fill in your name and shipping address.";
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
<<<<<<< HEAD
        checkoutError.textContent =
            "Please enter a valid email address.";
        return;
    }

    if (cart.length === 0) {
        checkoutError.textContent = "Your cart is empty.";
        return;
    }

    checkoutError.textContent = "";

    const submitButton = checkoutForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "CONNECTING TO STRIPE...";
    }

    try {
        const items = cart.map(line => {
            const product = lineProduct(line);

            return {
                id: line.id,
                name: product.name,
                price: product.price,
                qty: line.qty
            };
        });

        const response = await fetch(
            "/api/create-checkout-session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items,
                    customer: {
                        name,
                        email,
                        address
                    }
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.url) {
            throw new Error(
                data.error || "Unable to start Stripe checkout."
            );
        }

        window.location.href = data.url;

    } catch (error) {
        console.error("Checkout error:", error);

        checkoutError.textContent =
            error.message ||
            "Something went wrong. Please try again.";

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "PLACE ORDER";
        }
    }
}

if (filtersBox) renderFilters();

searchInput.addEventListener(
    "input",
    renderProducts
);

sortSelect.addEventListener(
    "change",
    renderProducts
);

document
    .getElementById("cart-toggle")
    .addEventListener("click", openCart);

document
    .getElementById("cart-close")
    .addEventListener("click", closeCart);

document
    .getElementById("checkout-button")
    .addEventListener("click", openCheckout);

document
    .getElementById("checkout-close")
    .addEventListener("click", closeCheckout);

checkoutForm.addEventListener(
    "submit",
    placeOrder
);
=======
        checkoutError.textContent = "Please enter a valid email address.";
        return;
    }

    const { subtotal, shipping, tax, total } = cartTotals();
    const reference = orderNumber();

    const lines = cart.map(line => {
        const product = lineProduct(line);
        return `${line.qty} x ${product.name}${product.details ? ` (${product.details})` : ""} — ${money(product.price * line.qty)}`;
    });

    const body = [
        `Order ${reference}`,
        "",
        ...lines,
        "",
        `Subtotal: ${money(subtotal)}`,
        `Shipping: ${shipping === 0 ? "FREE" : money(shipping)}`,
        `Tax: ${money(tax)}`,
        `Total: ${money(total)}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Address: ${address}`
    ].join("\n");

    const orders = JSON.parse(localStorage.getItem("vortx-orders") || "[]");
    orders.push({ reference, placedAt: new Date().toISOString(), total, items: cart });
    localStorage.setItem("vortx-orders", JSON.stringify(orders));

    cart = [];
    saveCart();
    renderCart();
    renderProducts();

    checkoutForm.hidden = true;
    orderConfirmation.hidden = false;
    orderConfirmation.innerHTML = "";

    const heading = document.createElement("h4");
    heading.textContent = `Order ${reference} placed`;

    const message = document.createElement("p");
    message.textContent = `Thanks ${name}. A confirmation is on its way to ${email} and we will be in touch about build and delivery times.`;

    const receipt = document.createElement("pre");
    receipt.className = "receipt";
    receipt.textContent = body;

    const mail = document.createElement("a");
    mail.className = "button";
    mail.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`VORTX order ${reference}`)}&body=${encodeURIComponent(body)}`;
    mail.textContent = "EMAIL THIS ORDER TO VORTX";

    orderConfirmation.append(heading, message, receipt, mail);
    checkoutForm.reset();
}

filtersBox && renderFilters();
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
document.getElementById("checkout-button").addEventListener("click", openCheckout);
document.getElementById("checkout-close").addEventListener("click", closeCheckout);
checkoutForm.addEventListener("submit", placeOrder);
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77

overlay.addEventListener("click", () => {
    closeCheckout();
    closeCart();
});

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
<<<<<<< HEAD

    if (!checkoutModal.hidden) {
        closeCheckout();
    } else {
        closeCart();
    }
=======
    if (!checkoutModal.hidden) closeCheckout();
    else closeCart();
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
});

renderProducts();
renderCart();

window.addToCart = addToCart;
<<<<<<< HEAD
window.openCart = openCart;
=======
window.openCart = openCart;
>>>>>>> 02bb3788c57ff1eea22d53489f0160790aea9f77
