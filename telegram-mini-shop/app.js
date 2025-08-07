const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe?.user?.first_name || "Гость";
document.getElementById("greeting").innerText = `Привет, ${user}! Добро пожаловать на прогулки и катания!`;

const activities = [
  { id: 1, name: "Прогулки на катере", image: "https://..." },
  { id: 2, name: "Прогулки на яхте", image: "https://..." },
  { id: 3, name: "Гидроциклы", image: "https://..." },
  // добавь остальные
];

function renderActivities() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  activities.forEach(act => {
    const item = document.createElement("div");
    item.className = "bg-white p-3 rounded shadow";
    item.innerHTML = `
      <img src="${act.image}" class="w-full h-32 object-cover rounded mb-2" />
      <h2 class="font-semibold">${act.name}</h2>
      <a href="product.html?id=${act.id}" class="mt-2 inline-block bg-green-600 text-white px-3 py-1 rounded">Оставить заявку</a>
    `;
    list.appendChild(item);
  });
}

renderActivities();
