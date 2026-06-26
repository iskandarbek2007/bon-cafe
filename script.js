const menuData = {
  breakfast: [
    ["Le Petit", "Сэндвич-круассан с курицей и большой капучино.", "50 000 сум"],
    ["Сырники Bon!", "Нежные сырники с ягодным соусом и сметаной.", "42 000 сум"],
    ["Croissant Matin", "Круассан, мягкий сыр, салат и американо.", "60 000 сум"],
    ["French Omelette", "Омлет с зеленью, тостом и маленьким салатом.", "48 000 сум"],
    ["Avocado toast", "Тост с авокадо, яйцом пашот и зелёным салатом.", "58 000 сум"],
    ["Bon! Granola", "Гранола с йогуртом, ягодами и мёдом.", "39 000 сум"],
  ],
  pastry: [
    ["Классический круассан", "Слоёное тесто, сливочное масло, тонкая хрустящая корочка.", "24 000 сум"],
    ["Pain au chocolat", "Французская слойка с шоколадом собственного производства.", "28 000 сум"],
    ["Tarte Citron", "Лимонный тарт с воздушной меренгой.", "36 000 сум"],
    ["Macaron box", "Ассорти макарон для подарка или вечернего кофе.", "68 000 сум"],
    ["Brioche sucre", "Мягкая бриошь с сахарной корочкой.", "22 000 сум"],
    ["Cheese croissant", "Круассан с сыром для завтрака или take-away.", "30 000 сум"],
  ],
  coffee: [
    ["Grand cappuccino", "Плотная молочная текстура и мягкий кофейный баланс.", "32 000 сум"],
    ["Americano", "Чистый вкус зерна для завтрака и рабочих встреч.", "24 000 сум"],
    ["Raf Bon!", "Сливочный кофе с ванильной нотой.", "36 000 сум"],
    ["Espresso tonic", "Свежий холодный кофе для летней террасы.", "34 000 сум"],
    ["Latte noisette", "Латте с ореховой нотой и мягким послевкусием.", "35 000 сум"],
    ["Iced latte", "Холодный латте для жаркого дня в Ташкенте.", "33 000 сум"],
  ],
  dessert: [
    ["Tarte Citron", "Лимонный тарт с меренгой и тонкой песочной основой.", "36 000 сум"],
    ["Chocolate Bon!", "Шоколадный десерт из собственного производства.", "44 000 сум"],
    ["Getano ice cream", "Мороженое для семейного десерта или кофе-паузы.", "30 000 сум"],
    ["Macaron Paris", "Набор макарон с сезонными вкусами.", "68 000 сум"],
    ["Berry eclair", "Эклер с ванильным кремом и ягодной глазурью.", "34 000 сум"],
    ["Mille-feuille", "Слоёный французский десерт с заварным кремом.", "46 000 сум"],
  ],
  dinner: [
    ["Le Classique", "Круассан с сыром, салат Цезарь и большой американо.", "60 000 сум"],
    ["Salade verte", "Зелёный салат с лёгкой французской заправкой.", "52 000 сум"],
    ["Chicken croissant", "Тёплый круассан с курицей и сливочным соусом.", "46 000 сум"],
    ["Soupe du jour", "Суп дня с хлебом из собственной пекарни.", "44 000 сум"],
    ["Quiche Lorraine", "Киш с сыром, сливками и зелёным салатом.", "56 000 сум"],
    ["Pasta creme", "Паста в сливочном соусе с курицей и пармезаном.", "64 000 сум"],
  ],
};

// Loading Screen
const loadingScreen = document.getElementById('loadingScreen');

function hideLoadingScreen() {
  if (loadingScreen) {
    loadingScreen.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600);
  }
}

if (document.readyState === 'complete') {
  hideLoadingScreen();
} else {
  window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 600);
  });
}

// Menu Panel
const panel = document.querySelector("[data-menu-panel]");
const fullMenu = document.querySelector("[data-full-menu]");
const tabs = document.querySelectorAll("[data-menu]");
const categoryLabels = {
  breakfast: "Завтраки",
  pastry: "Выпечка",
  coffee: "Кофе",
  dessert: "Десерты",
  dinner: "Обед и вечер",
};

function renderMenu(category) {
  if (!panel) return;

  panel.innerHTML = menuData[category]
    .map(
      ([title, text, price]) => `
        <article class="menu-dish">
          <strong>${title}</strong>
          <span>${price}</span>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function renderFullMenu() {
  if (!fullMenu) return;

  fullMenu.innerHTML = Object.entries(menuData)
    .map(
      ([category, dishes]) => `
        <section class="menu-category" id="${category}">
          <div class="menu-category-head">
            <span>${categoryLabels[category]}</span>
            <h3>${categoryLabels[category]}</h3>
          </div>
          <div class="menu-stack">
            ${dishes
              .map(
                ([title, text, price]) => `
                  <article class="menu-dish menu-dish-row">
                    <strong>${title}</strong>
                    <p>${text}</p>
                    <span>${price}</span>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

renderFullMenu();

if (tabs.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderMenu(tab.dataset.menu);
    });
  });

  const hashCategory = window.location.hash.replace("#", "");
  const initialCategory = menuData[hashCategory] ? hashCategory : "breakfast";
  const initialTab = document.querySelector(`[data-menu="${initialCategory}"]`);

  if (initialTab) {
    tabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    initialTab.classList.add("is-active");
    initialTab.setAttribute("aria-selected", "true");
  }

  renderMenu(initialCategory);
}

// Header Scroll Effect
const header = document.querySelector("[data-elevate]");

function elevateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", elevateHeader, { passive: true });
elevateHeader();

// Branch Filtering
const chips = document.querySelectorAll("[data-filter]");
const branches = document.querySelectorAll("[data-type]");

if (chips.length && branches.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");

      const filter = chip.dataset.filter;
      branches.forEach((branch) => {
        const visible = filter === "all" || branch.dataset.type.includes(filter);
        branch.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-active');
    document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImage) {
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}

// Scroll Animations
const animatedItems = document.querySelectorAll(
  [
    "section:not(.hero)",
    ".quick-actions a",
    ".metrics div",
    ".season-grid article",
    ".menu-preview-card",
    ".mood-item",
    ".timeline div",
    ".delivery-card",
    ".branch",
    ".loyalty-list article",
    ".event-list article",
    ".review-grid article",
    ".popular-grid article",
    ".signature-grid article",
    ".order-steps article",
    ".menu-category",
    ".menu-dish",
  ].join(", ")
);

animatedItems.forEach((item, index) => {
  item.dataset.animate = "";
  item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 80}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
  );

  animatedItems.forEach((item) => revealObserver.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax Effect for Hero
const heroMedia = document.querySelector('.hero-media img');

if (heroMedia) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroMedia.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Counter Animation for Metrics
const metrics = document.querySelectorAll('.metrics strong');

if (metrics.length) {
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        
        if (text.includes('26')) {
          animateCounter(target, 0, 26, 1500, '-й');
        } else if (text.includes('08:00')) {
          target.style.opacity = '0';
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transition = 'opacity 600ms ease';
          }, 300);
        } else if (text.includes('Le Bon')) {
          target.style.opacity = '0';
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transition = 'opacity 600ms ease';
          }, 600);
        }
        
        metricObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach(metric => metricObserver.observe(metric));
}

function animateCounter(element, start, end, duration, suffix = '') {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * easeOut);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Preload Critical Images
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

preloadImage('hero-main.jpg');
preloadImage('menu-hero.jpg');

// Performance: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedElevateHeader = debounce(elevateHeader, 10);
window.removeEventListener('scroll', elevateHeader);
window.addEventListener('scroll', debouncedElevateHeader, { passive: true });
