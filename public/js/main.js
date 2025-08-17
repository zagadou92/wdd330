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

// 📌 Charger le menu
async function loadMenu() {
  try {
    const res = await fetch("http://localhost:3000/api/menu");
    const data = await res.json();
    const menuContainer = document.querySelector("#main-nav .menu");

    menuContainer.innerHTML = data.menu.map(item =>
      `<li><a href="${item.url}">${item.label}</a></li>`
    ).join("");
  } catch (error) {
    console.error("Erreur chargement menu:", error);
  }
}

// 📌 Charger le carrousel
async function loadCarousel() {
  try {
    const res = await fetch("http://localhost:3000/api/carousel");
    const data = await res.json();
    const carousel = document.querySelector(".carousel-slide");

    carousel.innerHTML = data.slides.map(slide =>
      `<img src="${slide.image}" alt="${slide.alt}" />`
    ).join("");
  } catch (error) {
    console.error("Erreur chargement carrousel:", error);
  }
}

// 📌 Charger les fonctionnalités
async function loadFeatures() {
  try {
    const res = await fetch("http://localhost:3000/api/features");
    const data = await res.json();
    const featuresContainer = document.querySelector(".features");

    featuresContainer.innerHTML = data.features.map(feature =>
      `<article>
        <i class="${feature.icon} fa-3x"></i>
        <h2>${feature.title}</h2>
        <p>${feature.description}</p>
      </article>`
    ).join("");
  } catch (error) {
    console.error("Erreur chargement fonctionnalités:", error);
  }
}

// 📌 Charger les devises
async function loadCurrencies() {
  try {
    const res = await fetch("http://localhost:3000/api/currencies");
    const data = await res.json();
    const select = document.querySelector("#currency-selector");

    select.innerHTML = data.currencies.map(curr =>
      `<option value="${curr.code}">${curr.label}</option>`
    ).join("");
  } catch (error) {
    console.error("Erreur chargement devises:", error);
  }
}

// 📌 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
  loadCarousel();
  loadFeatures();
  loadCurrencies();
});
// Menu hamburger
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.querySelector(".menu-icon i");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.querySelector(".menu-icon i");

menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.querySelector(".menu-icon i");
const backdrop = document.querySelector(".menu-backdrop");

menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});

// Fermer le menu si clic sur le fond flou
backdrop.addEventListener("click", () => {
  menuToggle.checked = false;
  menuIcon.classList.remove("fa-times");
  menuIcon.classList.add("fa-bars");
});


// --- Recherche Crypto avec CoinCap API ---
(() => {
  const API_BASE = 'https://api.coincap.io/v2';

  const $ = (sel, root=document) => root.querySelector(sel);
  const input = $('#crypto-search-input');
  const form = $('#crypto-search-form');
  const resultsBox = $('#crypto-search-results');
  const quickView = $('#crypto-quick-view');

  if (!input || !form || !resultsBox || !quickView) return;

  // Debounce
  const debounce = (fn, ms=300) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  // Rendu résultats
  function renderResults(list) {
    if (!list || list.length === 0) {
      resultsBox.innerHTML = `<div class="search-result-item">Aucun résultat</div>`;
      resultsBox.style.display = 'block';
      return;
    }

    resultsBox.innerHTML = list.map(asset => {
      const price = Number(asset.priceUsd || 0);
      const change = Number(asset.changePercent24Hr || 0);
      const changeClass = change >= 0 ? 'pos' : 'neg';
      return `
        <div class="search-result-item" data-id="${asset.id}">
          <div>
            <span class="result-name">${asset.name}</span>
            <span class="result-symbol">(${asset.symbol})</span>
          </div>
          <div class="result-price">$${price.toLocaleString(undefined,{maximumFractionDigits:8})}</div>
          <div class="result-change ${changeClass}">${change.toFixed(2)}%</div>
        </div>
      `;
    }).join('');
    resultsBox.style.display = 'block';
  }

  // Recherche API
  async function searchAssets(q) {
    if (!q || q.trim().length < 2) {
      resultsBox.style.display = 'none';
      return;
    }
    try {
      const url = `${API_BASE}/assets?limit=10&search=${encodeURIComponent(q.trim())}`;
      const res = await fetch(url);
      const data = await res.json();
      renderResults(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  // Vue rapide
  async function loadQuickView(assetId) {
    try {
      const res = await fetch(`${API_BASE}/assets/${assetId}`);
      const { data: a } = await res.json();
      if (!a) return;

      quickView.innerHTML = `
        <h3>${a.name} <small>(${a.symbol})</small></h3>
        <p>Prix: <strong>$${Number(a.priceUsd||0).toLocaleString(undefined,{maximumFractionDigits:8})}</strong></p>
        <p>Rang: #${a.rank}</p>
        <p>Cap. boursière: $${Number(a.marketCapUsd||0).toLocaleString()}</p>
        <p>Volume 24h: $${Number(a.volumeUsd24Hr||0).toLocaleString()}</p>
        <p>Variation 24h: 
          <strong style="color:${Number(a.changePercent24Hr)>=0 ? '#16a34a' : '#dc2626'}">
            ${Number(a.changePercent24Hr||0).toFixed(2)}%
          </strong>
        </p>
        <p><a href="https://coincap.io/assets/${a.id}" target="_blank">Voir sur CoinCap ↗</a></p>
      `;
      quickView.style.display = 'block';
    } catch (err) {
      console.error(err);
    }
  }

  // Événements
  input.addEventListener('input', debounce(e => searchAssets(e.target.value), 300));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const first = resultsBox.querySelector('.search-result-item[data-id]');
    if (first) {
      loadQuickView(first.dataset.id);
      resultsBox.style.display = 'none';
    }
  });

  resultsBox.addEventListener('click', e => {
    const item = e.target.closest('.search-result-item[data-id]');
    if (!item) return;
    loadQuickView(item.dataset.id);
    resultsBox.style.display = 'none';
  });

  document.addEventListener('click', e => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.style.display = 'none';
    }
  });
})();
// js/main.js

// Simulation de données (peut être remplacée par une API plus tard)
const newsData = [
  {
    date: "17/08",
    title: "🚀 Binance lance une carte crypto en Europe",
    content: "Les utilisateurs européens pourront désormais payer en magasin avec leur solde crypto directement via une carte Mastercard liée à Binance."
  },
  {
    date: "16/08",
    title: "💰 Solana dépasse les 100 $",
    content: "Solana continue de surprendre en franchissant un seuil symbolique grâce à l'intérêt croissant des investisseurs institutionnels."
  },
  {
    date: "15/08",
    title: "⚡ Lightning Network en expansion",
    content: "Plus de 5000 nouveaux nœuds actifs rejoignent le réseau Lightning, rendant les paiements Bitcoin plus rapides et moins chers."
  }
];

// Sélection du conteneur
const newsFeed = document.getElementById("news-feed");

// Injection dynamique
function loadNews() {
  newsData.forEach(article => {
    const newsItem = document.createElement("article");
    newsItem.classList.add("news-item");

    newsItem.innerHTML = `
      <h3>${article.title} <span class="date">[${article.date}]</span></h3>
      <p>${article.content}</p>
    `;

    // Animation simple (apparition progressive)
    newsItem.style.opacity = "0";
    newsFeed.appendChild(newsItem);

    setTimeout(() => {
      newsItem.style.transition = "opacity 0.8s ease-in";
      newsItem.style.opacity = "1";
    }, 100);
  });
}

// Ajouter la date du jour en haut
function displayTodayDate() {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("fr-FR", options);

  const introSection = document.querySelector(".news-intro");
  const dateElement = document.createElement("p");
  dateElement.textContent = `📅 Aujourd'hui : ${formattedDate}`;
  introSection.appendChild(dateElement);
}

// Exécution
document.addEventListener("DOMContentLoaded", () => {
  displayTodayDate();
  loadNews();
});


