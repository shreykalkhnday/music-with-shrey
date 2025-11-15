// =========================
// SAVE PRACTICE INTO STORAGE
// =========================
function savePracticeData(minutes) {
  const today = new Date().toISOString().split("T")[0];

  let practiceData = JSON.parse(localStorage.getItem("practiceData")) || {};

  practiceData[today] = (practiceData[today] || 0) + minutes;

  localStorage.setItem("practiceData", JSON.stringify(practiceData));
}



// =========================
// GET ALL DATA
// =========================
function getPracticeData() {
  return JSON.parse(localStorage.getItem("practiceData")) || {};
}



// =========================
// FORMAT DATA FOR CHART
// =========================
function getMonthlyChartData() {
  const data = getPracticeData();

  const days = [];
  const minutes = [];

  Object.keys(data).forEach(date => {
    const day = parseInt(date.split("-")[2]);
    days.push(day);
    minutes.push(data[date]);
  });

  return { days, minutes };
}



// =========================
// RENDER CHART
// =========================
let monthChartInstance = null;

function renderChart() {
  const { days, minutes } = getMonthlyChartData();

  const ctx = document.getElementById("monthChart");

  if (monthChartInstance) {
    monthChartInstance.destroy();
  }

  monthChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [{
        label: "Minutes Practiced",
        data: minutes,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}



// =========================
// BUTTON ACTION
// =========================
document.getElementById("savePractice").addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("practiceMinutes").value);

  if (!minutes || minutes < 1) {
    alert("Enter valid minutes!");
    return;
  }

  savePracticeData(minutes);
  renderChart();

  document.getElementById("practiceMinutes").value = "";
});



// =========================
// LOAD CHART ON PAGE OPEN
// =========================
window.onload = () => {
  renderChart();
};
