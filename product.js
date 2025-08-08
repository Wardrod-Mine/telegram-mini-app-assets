const activities = [
  {
    id: 1,
    name: "Прогулка на катере",
    image: "https://telegram-mini-app-assets/images/boat.jpg",
    description: "1 часовая прогулка по живописной реке. Включает напиток и музыку."
  },
  {
    id: 2,
    name: "Прогулка на яхте",
    image: "https://telegram-mini-app-assets/images/yacht.jpg",
    description: "2 часа на яхте с капитаном, закуски и фото на закате включены."
  },
  {
    id: 3,
    name: "Прогулка на паруснике",
    image: "https://telegram-mini-app-assets/images/sail.jpg",
    description: "Настоящее морское приключение под парусом, словно в кино."
  },
  {
    id: 4,
    name: "Катание на гидроцикле",
    image: "https://telegram-mini-app-assets/images/jetski.jpg",
    description: "Скорость, брызги и драйв — идеальный адреналин для двоих!"
  },
  {
    id: 5,
    name: "Катание на водных лыжах",
    image: "https://telegram-mini-app-assets/images/waterski.jpg",
    description: "Почувствуй себя чемпионом — вода и свобода под ногами!"
  },
  {
    id: 6,
    name: "Катание на вейкборде",
    image: "https://telegram-mini-app-assets/images/wakeboard.jpg",
    description: "Сальто, прыжки и стиль — водный спорт для настоящих."
  },
  {
    id: 7,
    name: "Катание на ватрушке",
    image: "https://telegram-mini-app-assets/images/tubing.jpg",
    description: "Бешеное веселье на воде — круги, визги и скорость!"
  },
  {
    id: 8,
    name: "Катание на подружке",
    image: "https://telegram-mini-app-assets/images/banana.jpg",
    description: "Катание вдвоем на надувной подруге — лучше, чем вы думаете!"
  },
  {
    id: 9,
    name: "Морские приключения",
    image: "https://telegram-mini-app-assets/images/adventure.jpg",
    description: "Исследуй море, найди тайны, создай воспоминания."
  }
];

const container = document.getElementById("product");
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const activity = activities.find(a => a.id === id);

if (!activity) {
  container.innerHTML = "<p class='text-center text-red-500'>Активность не найдена</p>";
} else {
  container.innerHTML = `
    <img src="${activity.image}" class="w-full h-52 object-cover rounded" />
    <h1 class="text-xl font-bold mt-4">${activity.name}</h1>
    <p class="text-gray-600">${activity.description}</p>
    <label class="block mt-4 text-sm font-semibold">Удобное время</label>
    <input id="when" type="text" placeholder="Например: завтра в 15:00" class="w-full p-2 border rounded mt-1" />
    <label class="block mt-4 text-sm font-semibold">Ваше имя</label>
    <input id="name" type="text" placeholder="Иван" class="w-full p-2 border rounded mt-1" />
    <label class="block mt-4 text-sm font-semibold">Телефон</label>
    <input id="phone" type="tel" placeholder="+7 (___) ___-__-__" class="w-full p-2 border rounded mt-1" />
    <label class="block mt-4 text-sm font-semibold">Количество человек</label>
    <select id="people" class="w-full p-2 border rounded mt-1">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4+">4+</option>
    </select>
    <button id="submit-btn" class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Отправить заявку</button>
  `;

  document.getElementById("submit-btn").addEventListener("click", async () => {
    const when = document.getElementById("when").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const people = document.getElementById("people").value;

    if (!when || !name || !phone) {
      Telegram.WebApp.showAlert("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const res = await fetch("https://telegram-webapp-server.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: activity.name,
          when,
          name,
          phone,
          people
        })
      });

      const result = await res.text();
      Telegram.WebApp.showAlert("Заявка успешно отправлена! Мы скоро свяжемся с вами.");
    } catch (err) {
      Telegram.WebApp.showAlert("Ошибка при отправке. Попробуйте позже.");
    }
  });
}