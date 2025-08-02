document.addEventListener("DOMContentLoaded", () => {
  const cryptoConvertButton = document.getElementById("cryptoConvertButton");
  const cryptoAmountInput = document.getElementById("crypto-amount");
  const cryptoFromSelect = document.getElementById("crypto-from");
  const cryptoToSelect = document.getElementById("crypto-to");
  const cryptoResultDisplay = document.getElementById("cryptoResult");

  // Si le convertisseur n’existe pas sur cette page, on sort (ex: page accueil)
  if (!cryptoConvertButton || !cryptoAmountInput || !cryptoFromSelect || !cryptoToSelect || !cryptoResultDisplay) {
    return;
  }

  // Map des symboles vers IDs CoinCap
  const idMap = {
    btc: "bitcoin",
    eth: "ethereum",
    usdt: "tether",
    usd: "united-states-dollar",
    eur: "euro",
    xof: null // Pas pris en charge par CoinCap, prévoir gestion spécifique ou retirer
  };

  async function getRate(id) {
    if (!id) return null; // Pour cas xof ou non pris en charge
    try {
      const response = await fetch("https://api.coincap.io/v2/rates");
      const data = await response.json();
      const rateData = data.data.find(rate => rate.id === id);
      return rateData ? parseFloat(rateData.rateUsd) : null;
    } catch (e) {
      console.error("Erreur récupération taux :", e);
      return null;
    }
  }

  cryptoConvertButton.addEventListener("click", async () => {
    const inputAmount = parseFloat(cryptoAmountInput.value.trim());
    const fromSymbol = cryptoFromSelect.value.toLowerCase();
    const toSymbol = cryptoToSelect.value.toLowerCase();

    if (isNaN(inputAmount) || inputAmount <= 0) {
      cryptoResultDisplay.textContent = "Veuillez entrer un montant valide.";
      return;
    }
    if (!fromSymbol || !toSymbol) {
      cryptoResultDisplay.textContent = "Veuillez sélectionner les deux devises.";
      return;
    }

    const fromCurrency = idMap[fromSymbol];
    const toCurrency = idMap[toSymbol];

    if (!fromCurrency || !toCurrency) {
      cryptoResultDisplay.textContent = "Devise non prise en charge.";
      return;
    }

    try {
      const [fromRateUsd, toRateUsd] = await Promise.all([
        getRate(fromCurrency),
        getRate(toCurrency),
      ]);

      if (!fromRateUsd || !toRateUsd) {
        cryptoResultDisplay.textContent = "Impossible de récupérer les taux.";
        return;
      }

      const convertedAmount = inputAmount * (fromRateUsd / toRateUsd);
      cryptoResultDisplay.textContent = `${inputAmount} ${fromSymbol.toUpperCase()} = ${convertedAmount.toFixed(6)} ${toSymbol.toUpperCase()}`;
    } catch (error) {
      cryptoResultDisplay.textContent = "Erreur lors de la conversion.";
      console.error("Conversion error :", error);
    }
  });
});
