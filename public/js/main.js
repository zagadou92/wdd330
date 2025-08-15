document.addEventListener('DOMContentLoaded', () => {
  /* --- Boutons inscription & connexion --- */
  const signupBtn = document.querySelector('.bottom-auth-buttons .btn-highlight');
  const loginBtn = document.querySelector('.bottom-auth-buttons .btn-small');

  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Tu vas être redirigé vers la page d'inscription !");
      window.location.href = 'inscription.html';
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Tu vas être redirigé vers la page de connexion !");
      window.location.href = 'connexion.html';
    });
  }

  /* --- Menu burger --- */
  const burgerBtn = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');

  if (burgerBtn && nav) {
    burgerBtn.addEventListener('click', () => {
      const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
    });
  }

  /* --- Changement de thème --- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkModeClass = 'dark-mode';

  if (themeToggleBtn) {
    // Charger le thème sauvegardé
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add(darkModeClass);
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle(darkModeClass);
      const isDark = document.body.classList.contains(darkModeClass);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  /* --- Convertisseur crypto --- */
  const form = document.getElementById('converter-form');
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('error');
  const historyList = document.getElementById('history-list');
  const resultContainer = document.getElementById('result-container');

  if (form) {
    const USD_TO_XOF = 615;
    const USD_TO_EUR = 0.91;

    async function getCryptoPriceUSD(cryptoId) {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
        if (!response.ok) throw new Error('Erreur API');
        const data = await response.json();
        return data[cryptoId].usd;
      } catch {
        throw new Error('Impossible de récupérer le prix');
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!errorEl || !resultEl || !resultContainer) return;

      errorEl.textContent = '';
      resultEl.textContent = '';
      resultContainer.hidden = true;

      const amount = parseFloat(form.amount.value);
      const fromCrypto = form['from-currency'].value;

      if (!amount || amount <= 0) {
        errorEl.textContent = 'Veuillez saisir un montant valide supérieur à zéro.';
        return;
      }
      if (!fromCrypto) {
        errorEl.textContent = 'Veuillez sélectionner une cryptomonnaie.';
        return;
      }

      try {
        const priceUSD = await getCryptoPriceUSD(fromCrypto);
        const convertedUSD = amount * priceUSD;
        const convertedEUR = convertedUSD * USD_TO_EUR;
        const convertedXOF = convertedUSD * USD_TO_XOF;

        const formattedUSD = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(convertedUSD);
        const formattedEUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(convertedEUR);
        const formattedXOF = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(convertedXOF);

        resultEl.innerHTML = `
          <strong>${amount} ${fromCrypto.toUpperCase()} =</strong><br>
          ${formattedUSD} (Dollar US)<br>
          ${formattedEUR} (Euro)<br>
          ${formattedXOF} (Franc CFA)
        `;
        resultContainer.hidden = false;

        if (historyList) {
          const toCurrency = form['to-currency'].value;
          let selectedFormatted = 'N/A';
          if (toCurrency === 'usd') selectedFormatted = formattedUSD;
          if (toCurrency === 'eur') selectedFormatted = formattedEUR;
          if (toCurrency === 'xof') selectedFormatted = formattedXOF;

          const li = document.createElement('li');
          li.textContent = `${new Date().toLocaleString()} : ${amount} ${fromCrypto.toUpperCase()} → ${selectedFormatted}`;
          historyList.prepend(li);
        }

      } catch (err) {
        errorEl.textContent = err.message;
      }
    });
  }
});

  // Carrousel simple avec défilement automatique une par une
  const slide = document.querySelector('.carousel-slide');
  const images = document.querySelectorAll('.carousel-slide img');
  const dotsContainer = document.querySelector('.carousel-dots');
  let index = 0;
  let interval;

  // Créer les points d’indication
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
      index = i;
      updateCarousel();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-dots span');

  function updateCarousel() {
    slide.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function autoSlide() {
    index = (index + 1) % images.length;
    updateCarousel();
  }

  function resetAutoSlide() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 4000);
  }

  // Initialisation
  updateCarousel();
  interval = setInterval(autoSlide, 4000);
const cryptoDB = [
  { name: "Bitcoin", symbol: "BTC", description: "La première et la plus connue des cryptomonnaies.", logo: "images/bitcoin.png" },
  { name: "Ethereum", symbol: "ETH", description: "Plateforme de smart contracts et crypto populaire.", logo: "images/ethereum.png" },
  { name: "Binance Coin", symbol: "BNB", description: "Crypto de l’échange Binance, utilisée pour les frais.", logo: "images/bnb.png" },
  { name: "Tether", symbol: "USDT", description: "Stablecoin indexé sur le dollar US.", logo: "images/tether.png" },
  { name: "Cardano", symbol: "ADA", description: "Crypto blockchain avec approche scientifique et académique.", logo: "images/cardano.png" },
  { name: "Solana", symbol: "SOL", description: "Blockchain rapide et scalable pour applications décentralisées.", logo: "images/solana.png" },
  { name: "Ripple", symbol: "XRP", description: "Crypto utilisée pour les transferts internationaux rapides.", logo: "images/ripple.png" }
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
    resultsList.innerHTML = '<p>Aucun résultat trouvé.</p>';
    return;
  }

  results.forEach(crypto => {
    const card = document.createElement('div');
    card.classList.add('crypto-card');
    card.innerHTML = `
      <img src="${crypto.logo}" alt="${crypto.name} logo" class="crypto-logo" />
      <h3>${crypto.name} (${crypto.symbol})</h3>
      <p>${crypto.description}</p>
      <button class="btn-view">Voir plus</button>
    `;
    resultsList.appendChild(card);
  });
});
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');

// Charger le thème enregistré
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

// Événement clic
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Changer l’icône
  if (body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});


  


