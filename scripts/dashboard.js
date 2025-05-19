// Source: GeeksforGeeks (https://www.geeksforgeeks.org/read-json-file-using-javascript/)

let scholarshipData;
async function loadScholarships() {
  try {
    const response = await fetch('scripts/scholarships.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    scholarshipData = await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

async function renderScholarships() {
  if (!scholarshipData) {
    await loadScholarships(); // Only load once
  }
  showScholarships(getFilteredScholarships());
}

function showScholarships(scholarshipData) {
  document.getElementById("scholarships").innerHTML = ""
  for (let i = 0; i < scholarshipData.length; i++) {
    let scholarshipBox = document.createElement('div')
    scholarshipBox.className = "scholarship-box"

    let scholarshipTitle = document.createElement('h2')
    scholarshipTitle.className = "scholarship-title"
    scholarshipTitle.innerText = scholarshipData[i]["name"]

    let scholarshipAmount = document.createElement('h3')
    scholarshipAmount.className = "scholarship-amount"
    scholarshipAmount.innerText = "Amount: " + scholarshipData[i]["amount"]

    let scholarshipDeadline = document.createElement('h3')
    scholarshipDeadline.className = "scholarship-deadline"
    scholarshipDeadline.innerText = "Deadline: " + scholarshipData[i]["deadline"]

    let scholarshipButton = document.createElement('button')
    scholarshipButton.className = "scholarship-button"
    scholarshipButton.innerText = "View Scholarship"
    scholarshipButton.onclick = function () { document.cookie = `currentScholarship=${JSON.stringify(scholarshipData[i])}`}

    let scholarshipLink = document.createElement('a')
    scholarshipLink.target = "_blank"
    scholarshipLink.className = "scholarship-link"
    scholarshipLink.href = "scholarship.html"
    scholarshipLink.appendChild(scholarshipButton)

    scholarshipBox.appendChild(scholarshipTitle)
    scholarshipBox.appendChild(scholarshipAmount)
    scholarshipBox.appendChild(scholarshipDeadline)
    scholarshipBox.appendChild(scholarshipLink)

    document.getElementById("scholarships").appendChild(scholarshipBox)
  }
}

function getFilteredScholarships(){
  let searchQuery = document.getElementById("searchbar").value.toLowerCase()
  let grade = document.getElementById("grade").value
  let sat = document.getElementById("sat").value
  let act = document.getElementById("act").value
  let legalStatus = document.getElementById("legal-status").value
  let lowIncome = document.getElementById("low-income").checked
  let firstGen = document.getElementById("first-gen").checked
  let race = document.getElementById("race").value

  console.log(searchQuery + "\n" + grade + "\n" + sat + "\n" + act + "\n" + legalStatus + "\n" + lowIncome + "\n" + firstGen + "\n" + race)

  // let availableScholarships = scholarshipData.filter(function(scholarship){
  //   if((JSON.stringify(Object.values(scholarship)).toLowerCase().includes(searchQuery))
  //   && (scholarship.grade_requirement === grade || !scholarship.grade_requirement || !grade)
  //   && (parseInt(scholarship.sat_score) <= sat || !scholarship.sat_score || !sat)
  //   && (parseInt(scholarship.act_score) <= act || !scholarship.act_score || !act)
  //   && (scholarship.us_legal_status === legalStatus || !scholarship.us_legal_status || !legalStatus)
  //   && (scholarship.low_income === "Yes" && lowIncome.checked)
  //   && (scholarship.first_gen === "Yes" && firstGen.checked)
  //   && (scholarship.race_requirement === race || !scholarship.race_requirement || !race)
  //   ){
  //     return true
  //   }
  //   return false
  // })

  let availableScholarships = scholarshipData.filter(function (scholarship) {
    // Search query
    if (searchQuery && !Object.values(scholarship).join(" ").toLowerCase().includes(searchQuery)) {
      return false;
    }

    // Grade (if provided)
    if (grade && scholarship.grade_requirement && scholarship.grade_requirement !== grade) {
      return false;
    }

    // SAT (if provided)
    if (sat && scholarship.sat_score && parseInt(scholarship.sat_score) > parseInt(sat)) {
      return false;
    }

    // ACT (if provided)
    if (act && scholarship.act_score && parseInt(scholarship.act_score) > parseInt(act)) {
      return false;
    }

    // Legal status (if provided)
    if (legalStatus && scholarship.us_legal_status && scholarship.us_legal_status !== legalStatus) {
      return false;
    }

    // Low income (only filter if checkbox is checked)
    if (lowIncome && scholarship.low_income !== "Yes") {
      return false;
    }

    // First-gen (only filter if checkbox is checked)
    if (firstGen && scholarship.first_gen !== "Yes") {
      return false;
    }

    // Race (if provided)
    if (race && scholarship.race_requirement && scholarship.race_requirement !== race) {
      return false;
    }

    return true;
  });

  document.getElementById("count").innerText = availableScholarships.length
  return availableScholarships
}

function changeTheme(){
  let storedTheme = localStorage.getItem("theme")
  if(storedTheme){
    if(storedTheme == "light"){
      localStorage.setItem("theme", "dark")
      makeDark()
    }
    else{
      localStorage.setItem("theme", "light")
      makeLight()
    }
  }
  else{
    localStorage.setItem("theme", "dark")
    makeDark()
  }
}

function makeDark(){
  document.getElementById("theme-image").src = "moon.png"
  document.getElementsByClassName("dashboard-container")[0].style.backgroundColor = "black"
  document.getElementsByClassName("dashboard-container")[0].style.color = "white"
  document.getElementsByClassName("scholarship-box").forEach(box => {box.style.borderColor = "white"});
}

function makeLight(){
  document.getElementById("theme-image").src = "sun.png"
  document.getElementsByClassName("dashboard-container")[0].style.backgroundColor = "white"
  document.getElementsByClassName("dashboard-container")[0].style.color = "black"
  document.getElementsByClassName("scholarship-box").forEach(box => {box.style.borderColor = "black"});
}

let open = false
document.getElementById("filter-button").addEventListener("click", function(){
  open = !open
  if(open){
    document.getElementById("filter-button").innerText = "— Filter"
    document.getElementById("filter-content").style.display = "grid"
  }
  else{
    document.getElementById("filter-button").innerText = "> Filter"
    document.getElementById("filter-content").style.display = "none"
  }
})

// Shows how much time user has spent on the page
let sessionTime = parseInt(sessionStorage.getItem("sessionTime")) || 0;
const timer = setInterval(() => {
  sessionTime += 1;
  sessionStorage.setItem("sessionTime", sessionTime);
  let time = sessionTime
  let timeString = ""
  if (Math.floor(time / (60 * 60)) > 0) {
    timeString += `${Math.floor(time / (60 * 60))} hours `
    time %= 60 * 60
  }
  if (Math.floor(time / 60) > 0) {
    timeString += `${Math.floor(time / 60)} minutes `
    time %= 60
  }
  if (time > 0) {
    timeString += `${time} seconds`
  }

  document.getElementById("time").innerHTML = timeString
}, 1000);


document.addEventListener("DOMContentLoaded", async () => {
  await loadScholarships();         // Load JSON only once
  renderScholarships();             // Render initially

  // Now safe to hook up event listeners
  document.getElementById("apply").onclick = renderScholarships;
  document.getElementById("searchbar").addEventListener("input", renderScholarships);
});

if(localStorage.getItem("theme") === "dark"){
  makeDark()
}
else{
  makeLight()
}