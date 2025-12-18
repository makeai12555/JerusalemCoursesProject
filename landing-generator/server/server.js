const express = require("express");
const app = express();

// מאפשר קריאת JSON
app.use(express.json());

// מגיש את תיקיית public לדפדפן
app.use(express.static("public"));

/**
 * API – כאן מפתח A יתחבר בעתיד
 */
app.get("/api/course-data", (req, res) => {
  res.json({
    headline: "קורס צילום לנוער",
    subheadline: "לומדים לצלם כמו מקצוענים",
    description: "3 מפגשים חווייתיים בירושלים",
    cta: "להרשמה עכשיו",
    colors: {
      primary: "#1e3a8a",
      secondary: "#facc15"
    }
  });
});

// הפעלת השרת
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
