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

const panel = document.querySelector("[data-menu-panel]");
const tabs = document.querySelectorAll("[data-menu]");

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

const header = document.querySelector("[data-elevate]");

function elevateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", elevateHeader, { passive: true });
elevateHeader();

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
