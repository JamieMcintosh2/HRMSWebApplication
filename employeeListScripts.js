let selectedRow = '';
let employeeData;

//Event listener for button click to move to employee profile
document.getElementById('btnProfile').addEventListener('click', function() {
  // Check if a row has been selected
  if (selectedRow !== '') {
      // Retrieve the selected employee data from the 'selectedRow' variable
      const selectedEmployee = employeeData.find(employee => employee.id === selectedRow);

      // Store the selected employee object in localStorage
      localStorage.setItem('selectedEmployee', JSON.stringify(selectedEmployee));

      // Navigate to the profile page
      window.location.href = 'profile.html'; 
  } else {
      // When no Employee is selcted
      console.log('Please select an employee before proceeding.');
  }
});




function getAllEmployeeProfile(){
    fetch('https://profile-web-app-hr.azurewebsites.net/api/employees')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    employeeData = data;
    populateTable(data);
  })
  .catch(error => {
    // Error Handling
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
        
        // Add an Event listener listening for clicks on all rows
        newRow.addEventListener('click', () => {
            // Remove 'clicked' class from all rows to ensure none are getting selected by default
            const allRows = document.querySelectorAll('tr');
            allRows.forEach(row => {
                row.classList.remove('clicked');
            }); 
            //When one is clicked add 'clicked' class
            newRow.classList.add('clicked'); 


            //Logging to check SelectedRow is correct for the employee
            selectedRow = employee.id;
            console.log('Row clicked! Employee ID:', selectedRow);
            
        });
        
        tableBody.appendChild(newRow);
    });
}