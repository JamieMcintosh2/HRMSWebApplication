let apiEndpointFH = "http://developmentservicev1.cnd3fxdgewd0hcc8.uksouth.azurecontainer.io/api/feedbackHistory/"
let apiEndpointPH = "http://developmentservicev1.cnd3fxdgewd0hcc8.uksouth.azurecontainer.io/api/performanceHistory/"
let employeeSelected = JSON.parse(localStorage.getItem('selectedEmployee'));
let currentPerformance = JSON.parse(localStorage.getItem('empPerformance'));
let currentFeedback = JSON.parse(localStorage.getItem('empFeedback'));

//console.log(currentFeedback);
//console.log(currentPerformance);

// Fetch data from both endpoints
const fetchPerformance = fetch(apiEndpointPH + employeeSelected.id)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });

const fetchFeedback = fetch(apiEndpointFH + employeeSelected.id)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });

// Wait for both promises to return
Promise.all([fetchPerformance, fetchFeedback])
  .then(([performanceData, feedbackData]) => {
    populateTable(performanceData, feedbackData);
    populateFields();
  })
  .catch(error => {
    console.error('Error:', error);
  });

function populateFields()
{
    document.getElementById("employeeName").innerText = employeeSelected.fName + " " + employeeSelected.lName;
    document.getElementById("empScore").innerText = currentFeedback.overallScore;
    document.getElementById("emStrength").innerText = currentPerformance.strengths;
    document.getElementById("emWeaknesses").innerText = currentPerformance.weaknesses;
}

function populateTable(perfData, feedData){
    const tableBody = document.getElementById('performanceTB');
    //tableBody.innerHTML = '';

    //For Each loop
  // Add a row for each record
  perfData.forEach((history, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td data-th='Performance'>${feedData[index].overallScore}</td> <td data-th='Strengths'>${perfData[index].strengths}</td> <td data-th='Weaknesses'>${perfData[index].weaknesses}</td> <td data-th='Feedback'>${feedData[index].feedback}</td> <td data-th='Review Date'>${feedData[index].feedbackDate}</td>`;
    tableBody.appendChild(newRow);
  });
}
