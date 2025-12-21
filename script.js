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

