let selectedRow = '';
let employeeData;

//Event listener for button click to move to employee profile
// Adding event listener to the "View Profile" button
document.getElementById('btnProfile').addEventListener('click', function() {
  // Check if a row has been selected
  if (selectedRow !== '') {
      // Retrieve the selected employee data from the 'selectedRow' variable or your data source
      const selectedEmployee = employeeData.find(employee => employee.id === selectedRow);

      // Store the selected employee object in localStorage
      localStorage.setItem('selectedEmployee', JSON.stringify(selectedEmployee));

      // Navigate to the other HTML page
      window.location.href = 'profile.html'; // Replace 'other_page.html' with the desired page URL
  } else {
      // Handle the case when no row is selected
      console.log('Please select an employee before proceeding.');
  }
});




function getAllEmployeeProfile(){
    fetch('http://profileservicev1.hpbjgbfgexcqehau.uksouth.azurecontainer.io/api/employees')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data received from the API
    console.log('Data received:', data);
    // perform operations with the 'data' here
    employeeData = data;
    populateTable(data);
  })
  .catch(error => {
    // Handle errors that may occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
}

function populateTable(data){
    const tableBody = document.getElementById('employeeTB');
    //tableBody.innerHTML = '';

    //For Each loop
    data.forEach(employee => {
        //Adds a new row to the table for each employee
        const newRow = document.createElement('tr');

        //Self Reminder - Remember to use backticks ` not single or double quotes ' "
        newRow.innerHTML = `<td data-th='Employee ID'>${employee.id}</td> <td data-th='First Name'>${employee.fName}</td> <td data-th='Last Name'>${employee.lName}</td> <td data-th='Phone Number'>${employee.pNumber}</td>`;
        
        // Add a click event listener to each row
        newRow.addEventListener('click', () => {
            // Remove 'clicked' class from all rows
            const allRows = document.querySelectorAll('tr');
            allRows.forEach(row => {
                row.classList.remove('clicked');
            }); 
            newRow.classList.add('clicked'); 


            selectedRow = employee.id;
            console.log('Row clicked! Employee ID:', selectedRow);
            // Perform actions when a row is clicked
        });
        
        tableBody.appendChild(newRow);
    });
}