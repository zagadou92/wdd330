// Base de données locale simulée étendue à 27 cryptos
const cryptoDB = [
  { name: "Bitcoin", symbol: "BTC", description: "La première et la plus connue des cryptomonnaies." },
  { name: "Ethereum", symbol: "ETH", description: "Plateforme de smart contracts et crypto populaire." },
  { name: "Binance Coin", symbol: "BNB", description: "Crypto de l’échange Binance, utilisée pour les frais." },
  { name: "Tether", symbol: "USDT", description: "Stablecoin indexé sur le dollar US." },
  { name: "Cardano", symbol: "ADA", description: "Crypto blockchain avec approche scientifique et académique." },
  { name: "Solana", symbol: "SOL", description: "Blockchain rapide et scalable pour applications décentralisées." },
  { name: "Ripple", symbol: "XRP", description: "Crypto utilisée pour les transferts internationaux rapides." },
  { name: "Polkadot", symbol: "DOT", description: "Crypto permettant l'interopérabilité entre blockchains." },
  { name: "Litecoin", symbol: "LTC", description: "Alternative à Bitcoin plus rapide pour les paiements." },
  { name: "Chainlink", symbol: "LINK", description: "Fournisseur d'oracles sécurisés pour smart contracts." },
  { name: "Dogecoin", symbol: "DOGE", description: "Crypto mème avec une communauté active et engagée." },
  { name: "Shiba Inu", symbol: "SHIB", description: "Token inspiré de Dogecoin, très spéculatif." },
  { name: "Avalanche", symbol: "AVAX", description: "Blockchain rapide pour dApps et projets DeFi." },
  { name: "Polygon", symbol: "MATIC", description: "Solution Layer 2 pour scalabilité Ethereum." },
  { name: "Cosmos", symbol: "ATOM", description: "Blockchain visant à connecter plusieurs réseaux via IBC." },
  { name: "VeChain", symbol: "VET", description: "Blockchain pour la traçabilité et supply chain." },
  { name: "Terra", symbol: "LUNA", description: "Plateforme DeFi avec stablecoins algorithmiques." },
  { name: "Algorand", symbol: "ALGO", description: "Blockchain rapide et décentralisée pour dApps." },
  { name: "Stellar", symbol: "XLM", description: "Facilite les paiements transfrontaliers et micropaiements." },
  { name: "Uniswap", symbol: "UNI", description: "DEX sur Ethereum pour échanges de tokens." },
  { name: "Aave", symbol: "AAVE", description: "Protocole de prêt et emprunt DeFi." },
  { name: "Monero", symbol: "XMR", description: "Crypto axée sur la confidentialité et l’anonymat." },
  { name: "Tezos", symbol: "XTZ", description: "Blockchain auto-amendable et proof-of-stake." },
  { name: "Elrond", symbol: "EGLD", description: "Blockchain rapide et scalable pour dApps et finance." },
  { name: "Fantom", symbol: "FTM", description: "Blockchain ultra-rapide pour DeFi et smart contracts." },
  { name: "Theta", symbol: "THETA", description: "Blockchain pour streaming vidéo et partage de contenu." },
  { name: "Hedera", symbol: "HBAR", description: "Plateforme rapide et sécurisée avec consensus unique." },
  { name: "Neo", symbol: "NEO", description: "Blockchain pour smart contracts et économie intelligente." }
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
const icon = toggleButton?.querySelector('i');

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (icon) {
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
  });
}
