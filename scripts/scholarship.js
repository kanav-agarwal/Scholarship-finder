// let scholarshipData = JSON.parse(localStorage.getItem("currentScholarship"))
let scholarshipData = JSON.parse(document.cookie.split("=")[1])

document.getElementById("scholarship-name").innerHTML = scholarshipData.name
document.getElementById("scholarship-amount").innerHTML = "Amount: " + scholarshipData.amount
document.getElementById("scholarship-deadline").innerHTML = "Deadline: " + scholarshipData.deadline

// for (const [key, value] of Object.entries(scholarshipData)) {
//     if(key !== "name" && key !== "amount" && key !== "deadline" && key !== "link"){
//         let criteria = document.createElement("li")
//         criteria.innerHTML = `${key}: ${value !== null ? value : "N/A"}`
//         document.getElementById("scholarship-eligibility").appendChild(criteria)
//     }
// }

if(scholarshipData.grade_requirement){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>Grade Requirement: </b>" + scholarshipData.grade_requirement
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.sat_score){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>SAT Score Requirement: </b>> " + scholarshipData.sat_score
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.act_score){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>ACT Score Requirement: </b>> " + scholarshipData.act_score
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.us_legal_status){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>US Legal Status Requirement: </b>" + scholarshipData.us_legal_status
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.first_gen){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>First-Generation: </b>" + scholarshipData.first_gen
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.low_income){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>Low Income: </b>" + scholarshipData.low_income
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}

if(scholarshipData.race_requirement){
    let criteria = document.createElement("li")
    criteria.innerHTML = "<b>Race Requirement: </b>" + scholarshipData.race_requirement
    document.getElementById("scholarship-eligibility").appendChild(criteria)
}


document.getElementById("scholarship-link").href = "https://www." + scholarshipData.link