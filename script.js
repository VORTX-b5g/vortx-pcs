 // VORTX PCS - PC Builder

const CONTACT_EMAIL = "vortxpcs@gmail.com";

const components = [
    "cpu",
    "gpu",
    "motherboard",
    "ram",
    "storage",
    "psu",
    "case",
    "cooler"
];

const componentNames = {
    cpu: "CPU",
    gpu: "GPU",
    motherboard: "Motherboard",
    ram: "RAM",
    storage: "Storage",
    psu: "Power Supply",
    case: "Case",
    cooler: "CPU Cooler"
};

const presets = {
    core: { cpu: "110", gpu: "250", motherboard: "130", ram: "50", storage: "60", psu: "70", case: "70", cooler: "35" },
    pro: { cpu: "120", gpu: "400", motherboard: "100", ram: "80", storage: "100", psu: "90", case: "100", cooler: "80" },
    ultra: { cpu: "305", gpu: "500", motherboard: "150", ram: "110", storage: "170", psu: "130", case: "150", cooler: "120" }
};

const totalDisplay = document.getElementById("total");
const summaryList = document.getElementById("summary-list");
const compatibilityBox = document.getElementById("compatibility");

function selectedOption(id) {
    const select = document.getElementById(id);
    const option = select.options[select.selectedIndex];
    return Number(select.value) > 0 ? option : null;
}

function checkCompatibility() {
    const cpu = selectedOption("cpu");
    const gpu = selectedOption("gpu");
    const board = selectedOption("motherboard");
    const ram = selectedOption("ram");
    const psu = selectedOption("psu");
    const pcCase = selectedOption("case");
    const cooler = selectedOption("cooler");

    const issues = [];

    if (cpu && board && cpu.dataset.socket !== board.dataset.socket) {
        issues.push(`Socket mismatch: the CPU is ${cpu.dataset.socket} but the motherboard is ${board.dataset.socket}.`);
    }

    if (board && ram && board.dataset.mem !== ram.dataset.mem) {
        issues.push(`Memory mismatch: the motherboard takes ${board.dataset.mem} but the RAM is ${ram.dataset.mem}.`);
    }

    if (cpu && ram && !board && cpu.dataset.mem !== ram.dataset.mem) {
        issues.push(`This CPU platform expects ${cpu.dataset.mem} memory.`);
    }

    if (psu) {
        const load = Number(cpu?.dataset.watts || 0) + Number(gpu?.dataset.watts || 0);
        const recommended = load + 150;

        if (load > 0 && recommended > Number(psu.dataset.watts)) {
            issues.push(`Power: this build draws about ${load}W, so we recommend at least ${recommended}W (selected: ${psu.dataset.watts}W).`);
        }
    }

    if (pcCase && cooler && Number(cooler.dataset.radiator) > Number(pcCase.dataset.radiator)) {
        issues.push(`Cooling: the ${cooler.text.split(" — ")[0]} does not fit this case.`);
    }

    if (cpu && cooler && Number(cpu.dataset.watts) > Number(cooler.dataset.tdp)) {
        issues.push("Cooling: this cooler is under-specced for the selected CPU.");
    }

    compatibilityBox.classList.remove("good", "warning");

    const chosen = components.filter(id => selectedOption(id)).length;

    if (chosen === 0) {
        compatibilityBox.textContent = "Choose your components to check compatibility.";
        return true;
    }

    if (issues.length > 0) {
        compatibilityBox.classList.add("warning");
        compatibilityBox.innerHTML = issues.map(issue => `<div>${issue}</div>`).join("");
        return false;
    }

    compatibilityBox.classList.add("good");
    compatibilityBox.textContent = chosen === components.length
        ? "All components are compatible. This build is ready."
        : "No compatibility issues so far. Keep going.";

    return true;
}

function updateBuilder() {
    let total = 0;
    const selectedParts = [];

    components.forEach(id => {
        const select = document.getElementById(id);
        const price = Number(select.value);

        total += price;

        if (price > 0) {
            selectedParts.push({
                name: componentNames[id],
                value: select.options[select.selectedIndex].text
            });
        }
    });

    totalDisplay.textContent = `$${total.toLocaleString()}`;

    if (selectedParts.length === 0) {
        summaryList.innerHTML = "<p>No components selected yet.</p>";
    } else {
        summaryList.innerHTML = "";

        selectedParts.forEach(part => {
            const item = document.createElement("div");
            item.classList.add("summary-item");

            const label = document.createElement("span");
            label.textContent = part.name;

            const value = document.createElement("strong");
            value.textContent = part.value;

            item.append(label, value);
            summaryList.appendChild(item);
        });
    }

    checkCompatibility();
}

function applyPreset(name) {
    const preset = presets[name];
    if (!preset) return;

    components.forEach(id => {
        document.getElementById(id).value = preset[id];
    });

    updateBuilder();
    document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
}

function buildMyPc() {
    const chosen = components.filter(id => selectedOption(id));

    if (chosen.length < components.length) {
        compatibilityBox.classList.remove("good");
        compatibilityBox.classList.add("warning");
        compatibilityBox.textContent = "Pick every component before submitting your build.";
        return;
    }

    if (!checkCompatibility()) return;

    const price = components.reduce((sum, id) => sum + Number(document.getElementById(id).value), 0);
    const details = components.map(id => selectedOption(id).text.split(" — ")[0]).join(", ");

    window.addToCart(`custom-${Date.now()}`, {
        name: "Custom VORTX Build",
        price,
        details
    });

    window.openCart();
}

components.forEach(id => {
    document.getElementById(id).addEventListener("change", updateBuilder);
});

document.querySelectorAll("[data-preset]").forEach(button => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

document.getElementById("build-button").addEventListener("click", buildMyPc);

const contactEmailLink = document.getElementById("contact-email-link");
contactEmailLink.href = `mailto:${CONTACT_EMAIL}`;
contactEmailLink.textContent = CONTACT_EMAIL;


// CONTACT FORM
const contactForm = document.getElementById("contact-form");
const contactError = document.getElementById("contact-error");
const contactConfirmation = document.getElementById("contact-confirmation");
const contactButton = document.getElementById("contact-button");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    contactError.textContent = "";
    contactConfirmation.hidden = true;

    const formData = new FormData(contactForm);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const subject = formData.get("subject")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
        contactError.textContent = "Please fill out your name, email, and message.";
        return;
    }

    contactButton.disabled = true;
    contactButton.textContent = "SENDING...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to send message.");
        }

        contactForm.reset();

        contactConfirmation.textContent =
            "Message sent successfully! We will get back to you by email.";

        contactConfirmation.hidden = false;

    } catch (error) {
        console.error("Contact form error:", error);

        contactError.textContent =
            error.message || "Something went wrong. Please try again.";
    }

    contactButton.disabled = false;
    contactButton.textContent = "CONTACT VORTX";
});


updateBuilder();
