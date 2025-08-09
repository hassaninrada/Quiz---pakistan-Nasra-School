
const ctx = document.getElementById("barChart").getContext("2d");
let chart;

function filterResults() {
  const filter = document.getElementById("classFilter").value;
  const allResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
  const filtered = filter === "all" ? allResults : allResults.filter(r => r.class === filter);
  
  renderChart(filtered);
  renderTable(filtered);
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

function renderTable(results) {
  let tableHTML = `<table border="1">
    <tr>
      <th>Name</th>
      <th>Class</th>
      <th>Score</th>
      <th>Total</th>
      <th>Time</th>
      <th>Delete</th>
    </tr>`;
  
  results.forEach((r, index) => {
    tableHTML += `<tr>
      <td>${r.name}</td>
      <td>${r.class}</td>
      <td>${r.score}</td>
      <td>${r.total}</td>
      <td>${r.time}</td>
      <td><button onclick="deleteResult(${index})">Delete</button></td>
    </tr>`;
  });
  
  tableHTML += `</table>`;
  document.querySelector(".container").insertAdjacentHTML("beforeend", tableHTML);
}

function deleteResult(index) {
  let allResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
  allResults.splice(index, 1);
  localStorage.setItem("quizResults", JSON.stringify(allResults));
  filterResults();
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

// First load
filterResults();
