let selectedRow = '';
let allJobData;

function getAllJobs(){
    //fetch('https://localhost:5003/api/jobs')
    fetch('http://employmentservice.fxekhph3fmebdhdr.uksouth.azurecontainer.io/api/jobs')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data received from the API
    console.log('Data received:', data);
    // You can perform operations with the 'data' here
    allJobData = data;
    populateTable(data);
  })
  .catch(error => {
    // Handle errors that may occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
}

function populateTable(data){
    const tableBody = document.getElementById('jobTB');
    //tableBody.innerHTML = '';

    //For Each loop
    data.forEach(job => {
        //Adds a new row to the table for each employee
        const newRow = document.createElement('tr');

        //Self Reminder - Remember to use backticks ` not single or double quotes ' "
        newRow.innerHTML = `<td data-th='Job ID'>${job.id}</td> <td data-th='Job Title'>${job.jobTitle}</td> <td data-th='Department'>${job.department}</td> <td data-th='Salary'>${job.salary}</td>`;
        
        // Add a click event listener to each row
        newRow.addEventListener('click', () => {
            // Remove 'clicked' class from all rows
            const allRows = document.querySelectorAll('tr');
            allRows.forEach(row => {
                row.classList.remove('clicked');
            }); 
            newRow.classList.add('clicked'); 


            selectedRow = job.id;
            console.log('Row clicked! Job ID:', selectedRow);
            // Perform actions when a row is clicked
        });
        
        tableBody.appendChild(newRow);
    });
}
function addNewJobtoTable(newJobData)
{
    const tableBody = document.getElementById('jobTB');

    const newRow = document.createElement('tr');

    //Self Reminder - Remember to use backticks ` not single or double quotes ' "
    newRow.innerHTML = `<td data-th='Job ID'>${newJobData.id}</td> <td data-th='Job Title'>${newJobData.jobTitle}</td> <td data-th='Department'>${newJobData.department}</td> <td data-th='Salary'>${newJobData.salary}</td>`;
    
    // Add a click event listener to each row
    newRow.addEventListener('click', () => {
        // Remove 'clicked' class from all rows
        const allRows = document.querySelectorAll('tr');
        allRows.forEach(row => {
            row.classList.remove('clicked');
        }); 
        newRow.classList.add('clicked'); 


        selectedRow = newJobData.id;
        console.log('Row clicked! Job ID:', selectedRow);
        // Perform actions when a row is clicked
    });
    
    tableBody.appendChild(newRow);

}
function createJobDto() {
    const jobDto = {
        jobTitle: document.getElementById('jobTitle').value,
        Department: document.getElementById('jobDepartment').value,
        salary: parseInt(document.getElementById('jobSalary').value)
    };
    return jobDto;
}

function createNewJob(){
    const jobData = createJobDto(); //Getting the Job data to send to the api
    //'http://employmentservice.fxekhph3fmebdhdr.uksouth.azurecontainer.io/api/jobs'
    //'https://localhost:5003/api/jobs'
    fetch('http://employmentservice.fxekhph3fmebdhdr.uksouth.azurecontainer.io/api/jobs', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        createdJobID = data.id;
        addNewJobtoTable(data);
        alert("New Job Created Successfully");
        closeAddJobModal();
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });

}

function displayAddJobModal() {
    var modal = document.getElementById("idAddJob");
    modal.style.display = "block";
}

// Function to close the modal
function closeAddJobModal() {
    var modal = document.getElementById("idAddJob");
    modal.style.display = "none";

    // Clear input fields
    document.getElementById('jobTitle').value = '';
    document.getElementById('jobDepartment').value = '';
    document.getElementById('jobSalary').value = '';
}