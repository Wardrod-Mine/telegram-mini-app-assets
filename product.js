const tg = window.Telegram.WebApp;
tg.ready();

const activities = [
  {
    id: 1,
    name: "Прогулка на катере",
    image: "https://example.com/images/boat.jpg",
    description: "Лёгкий ветер, водная гладь и приятная музыка — всё, что нужно для релакса."
  },
  {
    id: 2,
    name: "Прогулка на яхте",
    image: "https://example.com/images/yacht.jpg",
    description: "Комфорт, стиль и море — романтика в каждой волне."
  },
  {
    id: 3,
    name: "Прогулка на паруснике",
    image: "https://example.com/images/sail.jpg",
    description: "Настоящее морское приключение под парусом, словно в кино."
  },
  {
    id: 4,
    name: "Катание на гидроцикле",
    image: "https://example.com/images/jetski.jpg",
    description: "Скорость, брызги и драйв — идеальный адреналин для двоих!"
  },
  {
    id: 5,
    name: "Катание на водных лыжах",
    image: "https://example.com/images/waterski.jpg",
    description: "Почувствуй себя чемпионом — вода и свобода под ногами!"
  },
  {
    id: 6,
    name: "Катание на вейкборде",
    image: "https://example.com/images/wakeboard.jpg",
    description: "Сальто, прыжки и стиль — водный спорт для настоящих."
  },
  {
    id: 7,
    name: "Катание на ватрушке",
    image: "https://example.com/images/tubing.jpg",
    description: "Бешеное веселье на воде — круги, визги и скорость!"
  },
  {
    id: 8,
    name: "Катание на подружке",
    image: "https://example.com/images/banana.jpg",
    description: "Катание вдвоем на надувной подруге — лучше, чем вы думаете!"
  },
  {
    id: 9,
    name: "Морские приключения",
    image: "https://example.com/images/adventure.jpg",
    description: "Исследуй море, найди тайны, создай воспоминания."
  }
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
      const res = await fetch("https://telegram-webapp-server.onrender.com/send-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          activity,
          when,
          name,
        }),
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
