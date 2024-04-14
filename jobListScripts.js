let selectedRow = '';
let allJobData;
let selectedJob;
let selectedDiv = '';

function validateInputUpdate()
{
    var salaryString = document.getElementById("jobSalaryEdit").value;

    if(!isNumeric(salaryString))
    {
        alert("Salary must be a numeric value");
        return false;
    }
    if(parseInt(salaryString) > 10000000)
    {
        alert("Salary is too high");
        return false;
    }
    // If Less than minimum wage
    if(parseInt(salaryString) < 18964)
    {
        alert("Salary is too low");
        return false;
    }

    return true;

}

function validateInput()
{
    //Must be numeric
    var salaryString = document.getElementById("jobSalary").value;

    if(!isNumeric(salaryString))
    {
        alert("Salary must be a numeric value");
        return false;
    }
    if(parseInt(salaryString) > 10000000)
    {
        alert("Salary is too high");
        return false;
    }
    // If Less than minimum wage
    if(parseInt(salaryString) < 18964)
    {
        alert("Salary is too low");
        return false;
    }

    return true;
}

function isNumeric(value)
{
    //If its Not a Number retrun false
    return !isNaN(parseFloat(value)) && isFinite(value);
}


function getAllJobs(){
    //fetch('https://localhost:5003/api/jobs')
    fetch('https://employmentservice-web-app.azurewebsites.net/api/jobs')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data received from the API
    console.log('Job Data received:', data);
    allJobData = data;
    populateTable(data);
  })
  .catch(error => {
    //Handle errors
    console.error('There was a problem fetching the Job Data:', error);
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
            selectedJob = allJobData.find(job => job.id === selectedRow);
        });
        
        tableBody.appendChild(newRow);
    });
}

function createJobDto() {
    const jobDepartmentSelect = document.getElementById('jobDepartment');
    const selectedOption = jobDepartmentSelect.options[jobDepartmentSelect.selectedIndex];
    const jobDto = {
        jobTitle: document.getElementById('jobTitle').value,
        Department: selectedOption.text,
        salary: parseInt(document.getElementById('jobSalary').value)
    };
    return jobDto;
}
function JobInfo()
{

    //Check for empty fields
    if (checkEmptyFields()) 
    {
        //Validation check
        if(validateInput())
        {
            //If all passes create the job
            createNewJob();
        }
        
    } 
}

function createNewJob(){

    const jobData = createJobDto(); //Getting the Job data to send to the api
    //'http://employmentservice.fxekhph3fmebdhdr.uksouth.azurecontainer.io/api/jobs'
    //'https://localhost:5003/api/jobs'
    fetch('https://employmentservice-web-app.azurewebsites.net/api/jobs', 
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
        location.reload();
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

function checkEmptyFields()
{
        //storing all the input/select fields inside the jobAdDiv
    // and checking if they are empty
    if(selectedDiv === "idAddJob")
    {
        const fields = document.querySelectorAll('#'+ selectedDiv +' input');
        let isEmpty = false;
    
        fields.forEach(field => {
            if (field.value.trim() === '' && field.hasAttribute('required')) {
                isEmpty = true;
                field.classList.add('w3-border-red'); // Add red border to empty required fields
            } else {
                field.classList.remove('w3-border-red'); // Remove red border if field is filled or not required
            }
        });
    
        const department = document.querySelector("#jobDepartment")
        if (department.value.trim() === '' && department.hasAttribute('required')) {
            isEmpty = true;
            department.classList.add('w3-border-red'); // Add red border to empty required department field
        } else {
            department.classList.remove('w3-border-red'); // Remove red border if department field is filled or not required
        }
    
        if (isEmpty) {
            alert('Please fill in all required fields.');
        }
        else{
            return true;
        }
    }
    if(selectedDiv === "idEditJob")
    {
        const fields = document.querySelectorAll('#'+ selectedDiv +' input');
        let isEmpty = false;
    
        fields.forEach(field => {
            if (field.value.trim() === '' && field.hasAttribute('required')) {
                isEmpty = true;
                field.classList.add('w3-border-red'); // Add red border to empty required fields
            } else {
                field.classList.remove('w3-border-red'); // Remove red border if field is filled or not required
            }
        });
    
        const department = document.querySelector("#jobDepartmentEdit")
        if (department.value.trim() === '' && department.hasAttribute('required')) {
            isEmpty = true;
            department.classList.add('w3-border-red'); // Add red border to empty required department field
        } else {
            department.classList.remove('w3-border-red'); // Remove red border if department field is filled or not required
        }
    
        if (isEmpty) {
            alert('Please fill in all required fields.');
        }
        else{
            return true;
        }
    }

}
function openModal1()
{
    document.getElementById('idAddJob').style.display = 'block';
    selectedDiv = 'idAddJob';
}
function openModal2()
{
    if(selectedRow != "")
    {
        document.getElementById('idEditJob').style.display = 'block';
        selectedDiv = 'idEditJob';
        populateEditFields();
    }
    else
    {
        alert("You must click an office from the list first");
    }

}
function populateEditFields()
{
        // Get the edit fields
        const jobTitleEdit = document.getElementById('jobTitleEdit');
        const jobDepartmentEdit = document.getElementById('jobDepartmentEdit');
        const jobSalaryEdit = document.getElementById('jobSalaryEdit');

    
        // Populate the edit fields with data from the selected office
        jobTitleEdit.value = selectedJob.jobTitle;
        jobDepartmentEdit.value = selectedJob.department;
        jobSalaryEdit.value = parseInt(selectedJob.salary);

    
        // Display the edit modal
        document.getElementById('idEditJob').style.display = 'block';
}

function updateJobInfo() {
    if (checkEmptyFields()) {
        if(validateInputUpdate())
        {
            // Get the values from the edit fields
            const jobDepartmentSelect = document.getElementById('jobDepartmentEdit');
            const selectedOption = jobDepartmentSelect.options[jobDepartmentSelect.selectedIndex];
            let newJobTitle = document.getElementById('jobTitleEdit').value;
            let newJobDepartment = selectedOption.text;
            let newJobSalary = document.getElementById('jobSalaryEdit').value;

            // Data to send to the API
            let dataToUpdate = [
                { op: 'replace', path: '/jobTitle', value: newJobTitle },
                { op: 'replace', path: '/department', value: newJobDepartment },
                { op: 'replace', path: '/salary', value: parseInt(newJobSalary) }
            ];
            patchJobData(dataToUpdate);
        }

    }
}

function patchJobData(patchData) {
    // API Endpoint for JOBS
    let jobUpdateEndpoint = 'https://employmentservice-web-app.azurewebsites.net/api/jobs/' + selectedJob.id;

    fetch(jobUpdateEndpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify(patchData)
    })
    .then(response => {
        // Handle the response from the server
            if (response.ok) 
            {
                console.log('PATCH request successful');
                alert('Data Successfully updated')
                // UPDATE UI
                location.reload();
    
            } else {
                throw new Error('PATCH request failed');
            }
        })
        .catch(error => 
        {
            console.error('Error:', error);
            
        });
    }