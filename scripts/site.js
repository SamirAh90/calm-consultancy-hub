const siteMenu = document.querySelector(".site-menu");

if (siteMenu instanceof HTMLDetailsElement) {
  const mobileMenu = window.matchMedia("(max-width: 700px)");
  const menuTrigger = siteMenu.querySelector("summary");
  const syncMenu = () => {
    siteMenu.open = !mobileMenu.matches;
  };

  menuTrigger?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    siteMenu.open = !siteMenu.open;
  });

  syncMenu();
  mobileMenu.addEventListener("change", syncMenu);
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm instanceof HTMLFormElement) {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("amne")?.trim();
  const message = contactForm.elements.namedItem("meddelande");
  const status = contactForm.querySelector("[data-form-status]");

  if (subject && message instanceof HTMLTextAreaElement && !message.value) {
    message.value = `Vi är intresserade av ${subject.toLocaleLowerCase("sv-SE")}. `;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const fields = new FormData(contactForm);
    const body = [
      `Namn: ${fields.get("namn") ?? ""}`,
      `E-post: ${fields.get("epost") ?? ""}`,
      `Verksamhet: ${fields.get("verksamhet") ?? ""}`,
      "",
      `${fields.get("meddelande") ?? ""}`,
    ].join("\n");
    const mailto = `mailto:info@mindtosafety.com?subject=${encodeURIComponent(subject || "Förutsättningslöst samtal")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (status) {
      status.textContent = "Ett e-postutkast har förberetts. Granska och skicka det i ditt e-postprogram. Om det inte öppnas, skriv direkt till info@mindtosafety.com.";
    }
  });
}