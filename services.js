// VORTX PCS - Repair hub and contact

const repairServices = [
    {
        id: "diagnostic",
        name: "Diagnostic & Clean",
        price: 49,
        turnaround: "1-2 days",
        includes: [
            "Full hardware health check",
            "Dust removal and cable tidy",
            "Fresh thermal paste",
            "Temperature and stability report"
        ]
    },
    {
        id: "no-boot",
        name: "No Boot / Hardware Fault",
        price: 89,
        from: true,
        turnaround: "2-4 days",
        includes: [
            "Component-level fault finding",
            "PSU, RAM and storage testing",
            "Written quote before any repair",
            "Diagnostic fee credited against the fix"
        ]
    },
    {
        id: "os-install",
        name: "OS & Driver Setup",
        price: 79,
        turnaround: "Same day",
        includes: [
            "Clean Windows install",
            "All drivers and firmware updated",
            "Essential apps and BIOS tuning",
            "Data kept on request"
        ]
    },
    {
        id: "virus",
        name: "Virus & Slowdown Cleanup",
        price: 69,
        turnaround: "1-2 days",
        includes: [
            "Malware and adware removal",
            "Startup and background clean-up",
            "Drive health check",
            "Security setup advice"
        ]
    },
    {
        id: "upgrade-fit",
        name: "Upgrade Fitting",
        price: 99,
        turnaround: "1-2 days",
        includes: [
            "GPU, CPU, RAM or storage install",
            "Cooling and airflow check",
            "Stress test and validation",
            "Parts supplied by you or by us"
        ]
    },
    {
        id: "data",
        name: "Data Backup & Transfer",
        price: 69,
        turnaround: "1-3 days",
        includes: [
            "Backup to your drive or ours",
            "Old machine to new machine transfer",
            "Accounts, files and game libraries",
            "Failing-drive recovery attempt"
        ]
    }
];

const repairsById = Object.fromEntries(repairServices.map(service => [service.id, service]));

const repairGrid = document.getElementById("repair-grid");
const repairForm = document.getElementById("repair-form");
const repairServiceSelect = document.getElementById("rp-service");
const repairError = document.getElementById("repair-error");
const repairConfirmation = document.getElementById("repair-confirmation");

const contactForm = document.getElementById("contact-form");
const contactError = document.getElementById("contact-error");
const contactConfirmation = document.getElementById("contact-confirmation");

function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function reference(prefix) {
    return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function priceLabel(service) {
    return `${service.from ? "from " : ""}$${service.price}`;
}

function saveRecord(key, record) {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    saved.push(record);
    localStorage.setItem(key, JSON.stringify(saved));
}

function mailLink(subject, body, label) {
    const link = document.createElement("a");
    link.className = "button";
    link.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    link.textContent = label;
    return link;
}

function showConfirmation(box, form, heading, message, body, mailSubject, mailLabel) {
    form.hidden = true;
    box.hidden = false;
    box.innerHTML = "";

    const title = document.createElement("h4");
    title.textContent = heading;

    const intro = document.createElement("p");
    intro.textContent = message;

    const receipt = document.createElement("pre");
    receipt.className = "receipt";
    receipt.textContent = body;

    const again = document.createElement("button");
    again.type = "button";
    again.className = "ghost-button";
    again.textContent = "SEND ANOTHER";
    again.addEventListener("click", () => {
        box.hidden = true;
        form.hidden = false;
        form.reset();
    });

    box.append(title, intro, receipt, mailLink(mailSubject, body, mailLabel), again);
    form.reset();
}

function selectRepair(id) {
    repairServiceSelect.value = id;
    document.getElementById("repair-form").scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("rp-name").focus({ preventScroll: true });
}

function renderRepairs() {
    repairGrid.innerHTML = "";

    repairServices.forEach(service => {
        const card = document.createElement("article");
        card.className = "repair-card";

        const name = document.createElement("h3");
        name.textContent = service.name;

        const price = document.createElement("strong");
        price.className = "repair-price";
        price.textContent = priceLabel(service);

        const turnaround = document.createElement("p");
        turnaround.className = "repair-turnaround";
        turnaround.textContent = `Typical turnaround: ${service.turnaround}`;

        const list = document.createElement("ul");
        service.includes.forEach(item => {
            const entry = document.createElement("li");
            entry.textContent = item;
            list.appendChild(entry);
        });

        const book = document.createElement("button");
        book.type = "button";
        book.className = "add-button";
        book.textContent = "BOOK THIS";
        book.addEventListener("click", () => selectRepair(service.id));

        card.append(name, price, turnaround, list, book);
        repairGrid.appendChild(card);
    });
}

function renderRepairOptions() {
    repairServiceSelect.innerHTML = "";

    repairServices.forEach(service => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = `${service.name} — ${priceLabel(service)}`;
        repairServiceSelect.appendChild(option);
    });

    const other = document.createElement("option");
    other.value = "other";
    other.textContent = "Not sure — please advise";
    repairServiceSelect.appendChild(other);
}

function bookRepair(event) {
    event.preventDefault();

    const name = document.getElementById("rp-name").value.trim();
    const email = document.getElementById("rp-email").value.trim();
    const phone = document.getElementById("rp-phone").value.trim();
    const device = document.getElementById("rp-device").value.trim();
    const issue = document.getElementById("rp-issue").value.trim();
    const date = document.getElementById("rp-date").value;
    const service = repairsById[repairServiceSelect.value];
    const serviceName = service ? `${service.name} (${priceLabel(service)})` : "Not sure — please advise";

    if (!name) {
        repairError.textContent = "Please tell us your name.";
        return;
    }

    if (!validEmail(email)) {
        repairError.textContent = "Please enter a valid email address.";
        return;
    }

    if (issue.length < 10) {
        repairError.textContent = "Please describe the fault so we can prepare for it.";
        return;
    }

    repairError.textContent = "";

    const ticket = reference("RP");

    const body = [
        `Repair booking ${ticket}`,
        "",
        `Service: ${serviceName}`,
        `Device: ${device || "Not specified"}`,
        `Preferred drop-off: ${date || "As soon as possible"}`,
        "",
        `Fault: ${issue}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`
    ].join("\n");

    saveRecord("vortx-repairs", {
        ticket,
        requestedAt: new Date().toISOString(),
        service: serviceName,
        name,
        email,
        phone,
        device,
        date,
        issue
    });

    showConfirmation(
        repairConfirmation,
        repairForm,
        `Booking ${ticket} received`,
        `Thanks ${name}. We will email ${email} to confirm your slot and give you a firm quote.`,
        body,
        `VORTX repair booking ${ticket}`,
        "SEND THIS BOOKING TO VORTX"
    );
}

function sendEnquiry(event) {
    event.preventDefault();

    const name = document.getElementById("ct-name").value.trim();
    const email = document.getElementById("ct-email").value.trim();
    const subject = document.getElementById("ct-subject").value;
    const message = document.getElementById("ct-message").value.trim();

    if (!name) {
        contactError.textContent = "Please tell us your name.";
        return;
    }

    if (!validEmail(email)) {
        contactError.textContent = "Please enter a valid email address.";
        return;
    }

    if (message.length < 10) {
        contactError.textContent = "Please add a little more detail to your message.";
        return;
    }

    contactError.textContent = "";

    const ticket = reference("EN");

    const body = [
        `Enquiry ${ticket}`,
        "",
        `Subject: ${subject}`,
        "",
        message,
        "",
        `Name: ${name}`,
        `Email: ${email}`
    ].join("\n");

    saveRecord("vortx-enquiries", {
        ticket,
        sentAt: new Date().toISOString(),
        subject,
        name,
        email,
        message
    });

    showConfirmation(
        contactConfirmation,
        contactForm,
        `Enquiry ${ticket} sent`,
        `Thanks ${name}. We have your message and will reply to ${email}.`,
        body,
        `VORTX enquiry ${ticket} — ${subject}`,
        "SEND THIS ENQUIRY TO VORTX"
    );
}

renderRepairs();
renderRepairOptions();

document.getElementById("rp-date").min = new Date().toISOString().slice(0, 10);

repairForm.addEventListener("submit", bookRepair);
contactForm.addEventListener("submit", sendEnquiry);
