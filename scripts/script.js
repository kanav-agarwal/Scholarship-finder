// Source: GeeksforGeeks (https://www.geeksforgeeks.org/read-json-file-using-javascript/)

let scholarshipData;
async function loadScholarships() {
  try {
    const response = await fetch('./scholarships.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    scholarshipData = await response.json();
    console.log(scholarshipData); // Now it’s defined
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

loadScholarships();
console.log(scholarshipData)
