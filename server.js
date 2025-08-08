
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Замените на ваши реальные значения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;


app.use(cors());
app.use(bodyParser.json());

console.log("TOKEN:", TELEGRAM_BOT_TOKEN);
console.log("CHAT_ID:", ADMIN_CHAT_ID);


app.post("/submit", async (req, res) => {
  const { activity, when, name, phone, people } = req.body;

  const message = `🛥 Новая заявка\n\nМероприятие: ${activity}\nКогда: ${when}\nИмя: ${name}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: ADMIN_CHAT_ID,
      text: message,
    });
    res.status(200).send("OK");
  } catch (error) {
      console.error("Ошибка отправки:", error.response?.data || error.message);
      res.status(500).send("Ошибка отправки");
  }

});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
