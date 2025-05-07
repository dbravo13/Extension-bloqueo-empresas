const input = document.getElementById("companyInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("companyList");

function renderList(companies) {
  list.innerHTML = "";
  companies.forEach((company, index) => {
    const li = document.createElement("li");
    li.textContent = company;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => {
      companies.splice(index, 1);
      chrome.storage.local.set({ blockedCompanies: companies });
      renderList(companies);
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

chrome.storage.local.get("blockedCompanies", (data) => {
  renderList(data.blockedCompanies || []);
});

addBtn.addEventListener("click", () => {
  const newCompany = input.value.trim();
  if (!newCompany) return;
  chrome.storage.local.get("blockedCompanies", (data) => {
    const companies = data.blockedCompanies || [];
    if (!companies.includes(newCompany)) {
      companies.push(newCompany);
      chrome.storage.local.set({ blockedCompanies: companies });
      renderList(companies);
      input.value = "";
    }
  });
});
