const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const selects = document.querySelectorAll("select");
const fromSelect = selects[0];
const toSelect = selects[1];
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");

let ratesData = {};

async function loadCurrencies() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  ratesData = data.rates;

  for (let currency in ratesData) {
    fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
    toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
  }

  fromSelect.value = "USD";
  toSelect.value = "INR";

  updateFlag(fromSelect);
  updateFlag(toSelect);
}

function updateFlag(select) {
  const countryCode = select.value.substring(0, 2);
  const img = select.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

selects.forEach(select => {
  select.addEventListener("change", () => updateFlag(select));
});

btn.addEventListener("click", () => {
  let amount = amountInput.value || 1;
  const rate =
    ratesData[toSelect.value] / ratesData[fromSelect.value];
  const result = (amount * rate).toFixed(2);
  msg.innerText = `${amount} ${fromSelect.value} = ${result} ${toSelect.value}`;
});

loadCurrencies();
const themeToggle = document.getElementById("themeToggle");
const modeText = document.querySelector(".mode-text");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
  modeText.innerText = "Light Mode";
}

// Toggle theme
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    modeText.innerText = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    modeText.innerText = "Dark Mode";
  }
});
