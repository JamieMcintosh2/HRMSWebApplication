let apiAddress = 'https://localhost:5000/api/';
let apiAddressEmploymentService = 'https://localhost:5003/api/';
let employeeSelected = JSON.parse(localStorage.getItem('selectedEmployee'));
console.log(employeeSelected.fName);

function patchEmergencyContact(dataToUpdate)
{
    let apiEmergencyEndpoint = apiAddress + 'emContacts/' + employeeSelected.id;
    fetch(apiEmergencyEndpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
        },
        body: JSON.stringify(dataToUpdate) // Convert your data to JSON
    })
    .then(response => {
    // Handle the response from the server
        if (response.ok) 
        {
            console.log('PATCH request successful');
            // You might want to update UI or handle success here
        } else {
            throw new Error('PATCH request failed');
        }
    })
    .catch(error => 
    {
        console.error('Error:', error);
        // Handle errors here
    });

}

function enableEditing() {
    // This function makes the <div> editable by adding the contenteditable attribute
    const divToEdit = document.getElementById('editEmergencyContact');

    const fNameEdit = document.getElementById('emergencyFName');
    const lNameEdit = document.getElementById('emergencyLName');
    const relationshipEdit = document.getElementById('emergRelationship');
    const emergPhoneEdit = document.getElementById('EmergPhoneNum');

    fNameEdit.contentEditable = true;
    fNameEdit.classList.add('editable');
    lNameEdit.contentEditable = true;
    lNameEdit.classList.add('editable');
    relationshipEdit.contentEditable = true;
    relationshipEdit.classList.add('editable');
    emergPhoneEdit.contentEditable = true;
    emergPhoneEdit.classList.add('editable');
    //divToEdit.contentEditable = true;
    if(!isEmergButtonAdded)
    {
        const button = document.createElement('button');
        button.textContent = 'Update';
        button.classList.add('w3-button', 'w3-teal', 'w3-margin-top');
        button.addEventListener('click', function() {
        // Add your edit functionality here
        let newFName = fNameEdit.textContent;
        let newLName = lNameEdit.textContent;
        let newRelationship = relationshipEdit.textContent;
        let newEmergPhone = emergPhoneEdit.textContent;
        console.log('Button clicked! newFName - ' + newFName);

        //data to send to the api
        let dataToUpdate = [
        { op: 'replace', path: '/fName', value: newFName },
        { op: 'replace', path: '/lName', value: newLName },
        { op: 'replace', path: '/Relationship', value: newRelationship },
        { op: 'replace', path: '/pNumber', value: newEmergPhone }


        ];
            //fName: newFName, lName: newLName, Relationship: newRelationship, pNumber: newEmergPhone

        
        console.log(dataToUpdate);
        patchEmergencyContact(dataToUpdate);
    });
    divToEdit.appendChild(button);
    isEmergButtonAdded = true;

    }


}
function editText(element) {
    // This function makes the <span> inside the <div> editable
    element.contentEditable = true;
    element.classList.add('editableSpan');
}

    // handling name element
    const empNameElement = document.getElementById('empName');
    let employeeName = employeeSelected.fName.concat(" ", employeeSelected.lName);
    empNameElement.textContent = employeeName;
    //Handling age element
    const empAgeElement = document.getElementById('empAge');
    empAgeElement.textContent = employeeSelected.age;
        //Handling phone number element
    const phoneNumElement = document.getElementById('EmpPhoneNum');
    phoneNumElement.textContent = employeeSelected.pNumber;


// Performing all of the GET requests concurrently

// Define all the API endpoints
let apiAddressEndpoint = apiAddress + 'addresses/' + employeeSelected.id;
let apiEmergencyEndpoint = apiAddress + 'emContacts/' + employeeSelected.id;
let apiEmployeeJobEndpoint = apiAddressEmploymentService + 'employees/' + employeeSelected.id;

// Create an array of fetch Promises
let fetchPromises = [
    fetch(apiAddressEndpoint),
    fetch(apiEmergencyEndpoint),
    fetch(apiEmployeeJobEndpoint)
];

// Execute all requests concurrently
Promise.all(fetchPromises)
    .then(responses => {
        // Process responses
        return Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }));
    })
    .then(dataArray => {
        const [addressData, emergencyData, employeeJobData] = dataArray;

        // Work with address data
        const empCityCountryElement = document.getElementById('cityCountry');
        let cityCountry = addressData.city.concat(", ", addressData.country);
        empCityCountryElement.textContent = cityCountry;

        // Work with emergency contact data
        const relationshipElement = document.getElementById('emergRelationship');
        relationshipElement.textContent = emergencyData.relationship;

        const emergFNameElement = document.getElementById('emergencyFName');
        emergFNameElement.textContent = emergencyData.fName;

        const emergLNameElement = document.getElementById('emergencyLName');
        emergLNameElement.textContent = emergencyData.lName;

        const phoneNumElement = document.getElementById('EmergPhoneNum');
        phoneNumElement.textContent = emergencyData.pNumber;

        // Work with employee job data
        const departmentElement = document.getElementById('jobDepartment');
        departmentElement.innerHTML = `<b>${employeeJobData.job.department} Department</b>`;

        const jobRoleElement = document.getElementById('jobRole');
        const jobRole2Element = document.getElementById('jobRole1');
        jobRoleElement.innerHTML = `<b>${employeeJobData.job.jobTitle}</b>`;
        jobRole2Element.innerHTML = `${employeeJobData.job.jobTitle}`;

        const jobSalaryElement = document.getElementById('jobSalary');
        jobSalaryElement.innerHTML = `<b>${employeeJobData.job.salary}</b>`;

        const officeNumElement = document.getElementById('officeNum');
        officeNumElement.innerHTML = `<b>${employeeJobData.office.buildingNum}</b>`;

        const officeStreetElement = document.getElementById('officeStreet');
        officeStreetElement.innerHTML = `<b>${employeeJobData.office.street}</b>`;

        const officePostcodeElement = document.getElementById('officePostcode');
        officePostcodeElement.innerHTML = `<b>${employeeJobData.office.postcode}</b>`;

        const officeCityElement = document.getElementById('officeCity');
        officeCityElement.innerHTML = `<b>${employeeJobData.office.city}</b>`;

        const officeCountryElement = document.getElementById('officeCountry');
        officeCountryElement.innerHTML = `<b>${employeeJobData.office.country}</b>`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


    //OLD Iterative approach of performing GET Requests
/*
//Getting selected employees address
let apiAddressEndpoint = apiAddress + 'addresses/' + employeeSelected.id;
fetch(apiAddressEndpoint)
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
// Work with the JSON data
console.log(data); // Display or process the fetched data

//Concat City and Country
const empCityCountryElement = document.getElementById('cityCountry');
let cityCountry = data.city.concat(", ", data.country);
empCityCountryElement.textContent = cityCountry; 

})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});


// Getting selected users emergency contact
let apiEmergencyEndpoint = apiAddress + 'emContacts/' + employeeSelected.id;
fetch(apiEmergencyEndpoint)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    // Work with the JSON data
    console.log(data); // Display or process the fetched data
    //Handling relationship element
    const relationshipElement = document.getElementById('emergRelationship');
    relationshipElement.textContent = data.relationship; // Replace 'jobTitle' with the property containing the job title from your API response
    //Handling Emergency name element
    const emergFNameElement = document.getElementById('emergencyFName');
    emergFNameElement.textContent = data.fName;
    const emergLNameElement = document.getElementById('emergencyLName');
    emergLNameElement.textContent = data.lName;
    //Handling Emergency phone number element
    const phoneNumElement = document.getElementById('EmergPhoneNum');
    phoneNumElement.textContent = data.pNumber;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Getting selected users Employment Info
let apiEmployeeJobEndpoint = apiAddressEmploymentService + 'employees/' + employeeSelected.id;
fetch(apiEmployeeJobEndpoint)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    // Work with the JSON data
    console.log(data); // Display or process the fetched data
    //Handling relationship element
    const departmentElement = document.getElementById('jobDepartment');
    departmentElement.innerHTML = `<b>${data.job.department}</b>`; //Using .innerHTML to keep the bold tags - .textContent removes it dont know why
    //Handling Emergency name element
    const jobRoleElement = document.getElementById('jobRole');
    jobRoleElement.innerHTML = `<b>${data.job.jobTitle}</b>`;
    const jobSalaryElement = document.getElementById('jobSalary');
    jobSalaryElement.innerHTML = `<b>${data.job.salary}</b>`;
    const officeNumElement = document.getElementById('officeNum');
    officeNumElement.innerHTML = `<b>${data.office.buildingNum}</b>`;
    const officeStreetElement = document.getElementById('officeStreet');
    officeStreetElement.innerHTML = `<b>${data.office.street}</b>`;
    const officePostcodeElement = document.getElementById('officePostcode');
    officePostcodeElement.innerHTML = `<b>${data.office.postcode}</b>`;
    const officeCityElement = document.getElementById('officeCity');
    officeCityElement.innerHTML = `<b>${data.office.city}</b>`;
    const officeCountryElement = document.getElementById('officeCountry');
    officeCountryElement.innerHTML = `<b>${data.office.country}</b>`;

    //Handling Emergency phone number element
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
*/




