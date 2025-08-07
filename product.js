const tg = window.Telegram.WebApp;
tg.ready();

const activities = [
  { id: 1, name: "Прогулки на катере", image: "https://..." },
  { id: 2, name: "Прогулки на яхте", image: "https://..." },
  // ...
];

const id = new URLSearchParams(window.location.search).get("id");
const act = activities.find(a => a.id == id);
const container = document.getElementById("product");

if (!act) {
  container.innerHTML = `<p>Активность не найдена</p>`;
} else {
  container.innerHTML = `
    <img src="${act.image}" class="w-full h-48 object-cover rounded mb-3" />
    <h1 class="text-2xl font-bold mb-2">${act.name}</h1>
    <textarea id="when" placeholder="Удобное время / дата" class="w-full p-2 border rounded mb-3"></textarea>
    <button id="apply" class="w-full bg-blue-600 text-white py-2 rounded">Оформить заявку</button>
  `;

  document.getElementById("apply").addEventListener("click", () => {
    const when = document.getElementById("when").value;
    const data = {
      name: tg.initDataUnsafe?.user?.first_name || "Гость",
      activity: act.name,
      when
    };
    tg.sendData(JSON.stringify(data));
  });
}
