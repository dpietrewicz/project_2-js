const form = document.getElementById("convertForm");
const addAlert = document.getElementById("addAlert");

async function fetchExchangeRate(currencyCode) {
    try {
        const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Błąd wczytywania danych");
        }
        const data = await response.json();
        return data.rates[0].mid;
    } catch {
        throw new Error("Błąd wczytywania danych");
    }
}

function convertCurrency(event) {
    event.preventDefault();
    const currencyCode = event.target.currencySelect.value;
    const inputAmount = Number(event.target.amountInput.value);
    if (inputAmount <= 0) {
        addAlert.innerText = "Wprowadź poprawną kwotę";
        return;
    }
    addAlert.innerText = "";
    fetchExchangeRate(currencyCode)
        .then((rate) => {
            const result = rate * inputAmount;
            document.getElementById("outputAmount").innerText =
                result.toFixed(2);
        })
        .catch((err) => {
            addAlert.innerText = err;
        });
}

form.addEventListener("submit", convertCurrency);
