const btn = document.getElementById("convertBtn");
const addAlert = document.getElementById("addAlert");

async function fetchExchangeRate(currencyCode) {
    const url = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}`;
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
        throw new Error(`Coś poszło nie tak: ${response.statusText}`);
    }
    const data = await response.json();
    return data.rates[0].mid;
}

function convertCurrency() {
    const currencyCode = document.getElementById("currencySelect").value;
    const inputAmount = parseFloat(
        document.getElementById("amountInput").value
    ).toFixed(2);
    if (inputAmount.trim() === "NaN") {
        addAlert.innerText = "Wprowadź kwotę";
    } else if (inputAmount.trim() <= 0) {
        addAlert.innerText = "Wartość powinna być większa od 0";
    } else {
        addAlert.innerHTML = "";
        fetchExchangeRate(currencyCode)
            .then((rate) => {
                const result = rate * inputAmount;
                document.getElementById("outputAmount").innerText =
                    parseFloat(result).toFixed(2);
            })
            .catch((err) => {
                console.error(err);
                addAlert.innerText =
                    "Kalkulator jest chwilowo niedostępny. Za utrudnienia przepraszamy.";
            });
    }
}

btn.addEventListener("click", convertCurrency);
