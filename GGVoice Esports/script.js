// 🕰️ SABİT SAHUR VE İFTAR SAATLERİ
const sahurSaati = "05:30";
const iftarSaati = "18:30";

// 🕰️ Geri sayımı hesaplayan fonksiyon
function updateCountdown(targetTime, elementId) {
    const countdownElement = document.getElementById(elementId);

    // Eğer HTML'de element yoksa işlemi durdur
    if (!countdownElement) {
        return;
    }

    const currentTime = new Date();
    const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
    
    const targetDate = new Date(currentTime);
    targetDate.setHours(targetHours, targetMinutes, 0, 0);

    // Eğer hedef zaman geçmişse, ertesi güne al
    if (targetDate < currentTime) {
        targetDate.setDate(targetDate.getDate() + 1);
    }

    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
        countdownElement.innerText = "Zaman Doldu!";
        return;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElement.innerText = `${hours} saat ${minutes} dakika ${seconds} saniye`;
}

// 🕰️ Geri sayımı başlatan fonksiyon
function startRamazanCountdown() {
    updateCountdown(sahurSaati, "sahurCountdown");
    updateCountdown(iftarSaati, "iftarCountdown");

    setInterval(() => updateCountdown(sahurSaati, "sahurCountdown"), 1000);
    setInterval(() => updateCountdown(iftarSaati, "iftarCountdown"), 1000);
}

// 📩 EmailJS ile başvuruyu gönderen fonksiyon
function sendEmail(event) {
    event.preventDefault(); // Sayfanın yenilenmesini önler

    // 📌 Form verilerini al
    const name = document.getElementById("name").value;
    const nickname = document.getElementById("nickname").value;
    const game = document.getElementById("game").value;
    const description = document.getElementById("description").value;
    const email = document.getElementById("email").value;

    // 📩 EmailJS servisine gönderilecek veriler
    const emailData = {
        from_name: name,
        nickname: nickname,
        game: game,
        description: description,
        email: email,
    };

    // 📌 EmailJS API ile gönderim
    emailjs.send("ggvoice_two", "ggvoice_one", emailData)
        .then(function(response) {
            alert("✅ Başvurunuz başarıyla gönderildi!");
            console.log("SUCCESS!", response);
        }, function(error) {
            alert("⚠️ Bir hata oluştu, lütfen tekrar deneyin.");
            console.log("FAILED...", error);
        });
}

// 📌 Sayfa yüklendiğinde gerekli işlemleri başlat
window.onload = function() {
    startRamazanCountdown(); // 🛠️ Geri sayımı başlat
    emailjs.init("YE-wTzF4NIh400Alv"); // 🛠️ EmailJS API'yi başlat

    // 📩 Form submit event'ini dinle
    document.getElementById("joinForm").addEventListener("submit", sendEmail);
};
