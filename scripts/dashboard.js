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
    showScholarships(scholarshipData)
}

function showScholarships(scholarshipData){
  for(let i = 0; i < scholarshipData.length; i++){
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
    scholarshipButton.onclick = function(){loadScholarshipsToStorage(scholarshipData[i])}

    let scholarshipLink = document.createElement('a')
    scholarshipLink.target = "_blank"
    scholarshipLink.className = "scholarship-link"
    scholarshipLink.href = "../scholarship.html"
    scholarshipLink.appendChild(scholarshipButton)

    scholarshipBox.appendChild(scholarshipTitle)
    scholarshipBox.appendChild(scholarshipAmount)
    scholarshipBox.appendChild(scholarshipDeadline)
    scholarshipBox.appendChild(scholarshipLink)

    document.getElementById("scholarships").appendChild(scholarshipBox)
  }
}

function loadScholarshipsToStorage(scholarship){
  localStorage.setItem("currentScholarship", JSON.stringify(scholarship))
}
  
renderScholarships();

