
const ctx = document.getElementById("barChart").getContext("2d");
let chart;

function filterResults() {
  const filter = document.getElementById("classFilter").value;
  const allResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
  const filtered = filter === "all" ? allResults : allResults.filter(r => r.class === filter);
  renderChart(filtered);
}

function renderChart(results) {
  const labels = results.map(r => r.name);
  const scores = results.map(r => r.score);

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{ label: "Score", data: scores }]
    }
  });
}
function sendResult() {
  fetch("https://script.google.com/macros/s/AKfycbx_BaTDRAvfcTrDMMIRYHT2Te4jeA10ZVd3TSdwLZSWAJGjrmpDBugjGs7MTXVkxCeqgQ/exec", {
    method: "POST",
    body: JSON.stringify({
      name: "Ali Khan",
      class: "Grade 8",
      score: 18,
      total: 20,
      timeString: "02:15",
      answers: { Q1: "A", Q2: "C", Q3: "B" }
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(d => console.log("Saved!", d))
  .catch(err => console.error("Error:", err));
}
function downloadCSV() {
  const data = JSON.parse(localStorage.getItem("quizResults") || "[]");
  let csv = "Name,Class,Score,Total,Time\n";
  data.forEach(d => {
    csv += `${d.name},${d.class},${d.score},${d.total},${d.time}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_results.csv";
  a.click();
}

function confirmDeleteAll() {
  if (confirm("Are you sure you want to delete ALL results?")) {
    localStorage.removeItem("quizResults");
    location.reload();
  }
}

filterResults();
