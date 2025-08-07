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
    <h1 id="activity" class="text-2xl font-bold mb-2">${act.name}</h1>
    <textarea id="when" placeholder="Удобное время / дата" class="w-full p-2 border rounded mb-3"></textarea>
    <button id="submit-btn" class="w-full bg-blue-600 text-white py-2 rounded">Оформить заявку</button>
  `;

  document.getElementById("submit-btn").addEventListener("click", async () => {
    const name = tg.initDataUnsafe.user?.first_name || "Гость";
    const activity = document.getElementById("activity").innerText;
    const date = document.getElementById("when").value.trim();

    if (!date) {
      tg.showAlert("Пожалуйста, укажите удобное время/дату.");
      return;
    }

    const data = { name, activity, date };

    try {
      const res = await fetch("https://telegram-mini-app-assets.onrender.com/send-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      // Успешная отправка
      tg.showAlert("✅ Заявка успешно отправлена!");

      const btn = document.getElementById("submit-btn");
      btn.innerText = "Отправлено ✅";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerText = "Оформить заявку";
        btn.disabled = false;
        document.getElementById("when").value = "";
      }, 3000);

    } catch (err) {
      tg.showAlert("❌ Не удалось отправить заявку. Попробуйте позже.");
      console.error(err);
    }
  });
}
