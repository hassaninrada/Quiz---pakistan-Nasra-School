
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
fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhp45yl62aJ859TgzFePq4nT3tHVKjb2-GnNhTKS0nLJwbuTZNOEnSxjGoyO_obCiliGK6n9mcWnGFmrJD7wmqXO27tsov6AgM1IDX1vQXVk8uPwPg-wCtVY0iqD5iPqT-dhC8RaFayhl3nvNJmcGt2n5bOVuk1WRO4crfCm7_JgQBIe_Y9RmqS3xQZ3hrrqwZGbVKbVADbJUPzfhWKA_op-7jKxQuKN6ry3IngcNulLJgbSu449N6mdTbjXo-LWYQc_33HdOK1i6NTenmfWgCJu7l7e8R8cGiB8FX8&lib=Mwo3KNCT54ZZ9q0I7sNG4WI3sArGKClt1")
  .then(response => response.json())
  .then(data => {
    console.log(data); // See data in console
    // Your logic to display results
  })
  .catch(error => console.error("Error fetching data:", error));

