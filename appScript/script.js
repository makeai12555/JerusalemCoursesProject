const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOlUCqpOqrQ8R-tDs7GVLP-eeBWEMQSwz4VYsO1PnRRpJ2ZeQevvG2Claw7vG6WlE_8A/exec';

// פונקציה לשליחה ל-Google Sheets
async function registerToSheet(formData) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        howDidYouArrive: formData.howDidYouArrive
      })
    });

    return { success: true, message: 'נרשמת בהצלחה! 🎉' };
  } catch (error) {
    return { success: false, message: 'שגיאה בשליחה, אנא נסה שוב' };
  }
}

// ניהול טופס הרשמה
document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const howDidYouArrive = document.getElementById('howDidYouArrive').value.trim();

  if (!fullName || !phoneNumber || !howDidYouArrive) {
    alert('אנא מלא את כל השדות');
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const formMessageText = document.getElementById('formMessageText');

  // הצג "שולח..."
  submitBtn.disabled = true;
  submitBtn.innerText = 'שולח...';

  // שלח את הנתונים
  const result = await registerToSheet({ fullName, phoneNumber, howDidYouArrive });

  // הצג הודעה
  formMessage.classList.remove('hidden');
  formMessageText.innerText = result.message;

  if (result.success) {
    formMessage.classList.add('bg-green-100', 'text-green-700');
    formMessage.classList.remove('bg-red-100', 'text-red-700');
    // נקה את הטופס
    document.getElementById('leadForm').reset();
  } else {
    formMessage.classList.add('bg-red-100', 'text-red-700');
    formMessage.classList.remove('bg-green-100', 'text-green-700');
  }

  // החזר כפתור למצב רגיל
  submitBtn.disabled = false;
  submitBtn.innerText = 'שלח פרטים להרשמה';
});

// קוד קיים - fetch של course-data
fetch("/api/course-data")
  .then(response => response.json())
  .then(data => {

    // טקסטים
    document.getElementById("headline").innerText = data.headline;
    document.getElementById("subheadline").innerText = data.subheadline;
    document.getElementById("description").innerText = data.description;
    document.getElementById("cta").innerText = data.cta;

    // צבעים
    document.body.style.backgroundColor = data.colors.primary;
    document.getElementById("cta").style.backgroundColor = data.colors.secondary;
  })
  .catch(err => {
    console.error("Failed to load course data", err);
  });

// פונקציה לגלילה לטופס
function scrollToForm() {
  document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
}
