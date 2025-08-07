document.getElementById("submit-btn").addEventListener("click", async () => {
  const name = tg.initDataUnsafe.user?.first_name || "Гость";
  const activity = document.getElementById("activity").innerText;
  const date = document.getElementById("date").value.trim();

  if (!date) {
    alert("Пожалуйста, укажите удобное время/дату.");
    return;
  }

  const data = { name, activity, date };

  try {
    const res = await fetch("https://your-server.com/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Ошибка отправки");

    // Успешная отправка
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.innerText = "Заявка отправлена ✅";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = "Отправить заявку";
      submitBtn.disabled = false;
      document.getElementById("date").value = "";
    }, 2500);
  } catch (err) {
    alert("Ошибка при отправке заявки. Попробуйте позже.");
    console.error(err);
  }
});
