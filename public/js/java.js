// Base de données locale simulée
const cryptoDB = [
  { name: "Bitcoin", symbol: "BTC", description: "La première et la plus connue des cryptomonnaies." },
  { name: "Ethereum", symbol: "ETH", description: "Plateforme de smart contracts et crypto populaire." },
  { name: "Binance Coin", symbol: "BNB", description: "Crypto de l’échange Binance, utilisée pour les frais." },
  { name: "Tether", symbol: "USDT", description: "Stablecoin indexé sur le dollar US." },
  { name: "Cardano", symbol: "ADA", description: "Crypto blockchain avec approche scientifique et académique." },
  { name: "Solana", symbol: "SOL", description: "Blockchain rapide et scalable pour applications décentralisées." },
  { name: "Ripple", symbol: "XRP", description: "Crypto utilisée pour les transferts internationaux rapides." }
];

const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  resultsList.innerHTML = '';

  if (!query) return;

  const results = cryptoDB.filter(crypto =>
    crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsList.innerHTML = '<li>Aucun résultat trouvé.</li>';
    return;
  }

  results.forEach(crypto => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${crypto.name} (${crypto.symbol})</strong> - ${crypto.description}`;
    resultsList.appendChild(li);
  });
});
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');