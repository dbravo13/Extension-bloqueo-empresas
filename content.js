function hideBlockedCompanies(blockedCompanies) {
  const lowerCompanies = blockedCompanies.map((c) => c.toLowerCase());

  // 🔹 ELEMPELO.COM
  const elempleoCards = document.querySelectorAll(".result-item");
  elempleoCards.forEach((card) => {
    const companySpan = card.querySelector(".info-company-name");
    const companyName = companySpan?.textContent?.toLowerCase()?.trim();
    if (
      companyName &&
      lowerCompanies.some((name) => companyName.includes(name))
    ) {
      card.style.display = "none";
    }
  });

  // 🔹 LINKEDIN
  const linkedinCards = document.querySelectorAll(".job-card-container");
  linkedinCards.forEach((card) => {
    const companySpan = card.querySelector(".job-card-container__company-name");
    const companyName = companySpan?.textContent?.toLowerCase()?.trim();

    if (
      companyName &&
      lowerCompanies.some((name) => companyName.includes(name))
    ) {
      card.style.display = "none";
    }
  });

  // 🔹 COMPUTRABajo.COM
  const computrabajoCards = document.querySelectorAll("article.box_offer");
  computrabajoCards.forEach((card) => {
    const companyLink = card.querySelector("a[offer-grid-article-company-url]");
    const companyName = companyLink?.textContent?.toLowerCase()?.trim();

    if (
      companyName &&
      lowerCompanies.some((name) => companyName.includes(name))
    ) {
      card.style.display = "none";
    }
  });
}

function observeAndHide() {
  chrome.storage.local.get("blockedCompanies", (data) => {
    const blocked = data.blockedCompanies || [];

    hideBlockedCompanies(blocked);

    const observer = new MutationObserver(() => {
      hideBlockedCompanies(blocked);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

observeAndHide();
