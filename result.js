
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
 type="module"
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC956df_ikTGvqVVl5gJXI0O5rau9vnT1A",
    authDomain: "quiz-ae8f1.firebaseapp.com",
    databaseURL: "https://quiz-ae8f1-default-rtdb.firebaseio.com",
    projectId: "quiz-ae8f1",
    storageBucket: "quiz-ae8f1.firebasestorage.app",
    messagingSenderId: "976773104820",
    appId: "1:976773104820:web:e64a23abc7a5ed896b83e1",
    measurementId: "G-4DH7YQWTG0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

