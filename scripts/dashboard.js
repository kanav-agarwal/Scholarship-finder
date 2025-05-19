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
  await loadScholarships();             // Wait for data to be fetched
  showScholarships(getFilteredScholarships())
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
  let lowIncome = document.getElementById("low-income").value
  let firstGen = document.getElementById("first-gen").value
  let race = document.getElementById("race").value

  let availableScholarships = scholarshipData.filter(function(scholarship){
    if((JSON.stringify(Object.values(scholarship)).toLowerCase().includes(searchQuery))
    && (scholarship.grade_requirement === grade || !scholarship.grade_requirement || !grade)
    && (parseInt(scholarship.sat_score) <= sat || !scholarship.sat_score || !sat)
    && (parseInt(scholarship.act_score) <= act || !scholarship.act_score || !act)
    && (scholarship.us_legal_status === legalStatus || !scholarship.us_legal_status || !legalStatus)
    && (scholarship.low_income === "Yes" && lowIncome === "low-income")
    && (scholarship.first_gen === "Yes" && firstGen === "first-gen")
    && (scholarship.race_requirement === race || !scholarship.race_requirement || !race)
    ){
      return true
    }
    return false
  })

  return availableScholarships
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

document.getElementById("apply").onclick = renderScholarships()

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

// Apply Filters and Search
document.getElementById('searchbar').addEventListener('input', function(){renderScholarships()})

// Initially Render Scholarships
renderScholarships();
