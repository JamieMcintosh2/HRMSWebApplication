//let apiAddressEmploymentService = 'https://localhost:5003/api/';
let apiAddressEmploymentService = 'http://employmentservicev1.gaevdjc8czexendt.uksouth.azurecontainer.io/api/';
let apiAddressProfileService = 'http://profileservicev1.hpbjgbfgexcqehau.uksouth.azurecontainer.io/api/';

let apiAllJobsEndpoint = apiAddressEmploymentService + 'jobs';
let apiAllOfficesEndpoint = apiAddressEmploymentService + 'offices';
let apiEmploymentEndpoint = apiAddressEmploymentService + 'employees';
let apiEmployeeEndpoint = apiAddressProfileService + 'employees';
let apiEmployeeAddressEndpoint = apiAddressProfileService + 'addresses';
let apiEmployeeEmergencyEndpoint = apiAddressProfileService + 'emContacts';
var empPhone ="";
var emergencyPhone="";

let createdEmployeeID = null;

function validateInput()
{
    var allInputCorrect = true;

    var dobString = document.getElementById("DOB").value;
    empPhone = document.getElementById("pNumber").value;
    var postalCode = document.getElementById("Postcode").value;
    emergencyPhone = document.getElementById("emergPNumber").value;
    // Remove all spaces from the phone number
    empPhone = empPhone.replace(/\s/g, '');
    emergencyPhone = emergencyPhone.replace(/\s/g, '');

    // Convert dobString to a Date object
    var dob = new Date(dobString);
    // If CheckDate returns false return false -- Invalid Age entered
    if(!checkDate(dob))
    {
        return false;
    }
    if(!checkPhoneNumber(empPhone))
    {
        return false;
    }
    if(!checkPhoneNumber(emergencyPhone))
    {
        return false;
    }
    if(!checkPostalCode(postalCode))
    {
        return false;
    }

    //Checking if fields contain alphabetical characters excluding fields where this is expected
    const fields = document.querySelectorAll('input:not(#houseNum):not(#pNumber):not(#Postcode):not(#DOB):not(#emergPNumber)');
    var isValid = true;

    fields.forEach(function (input) {
        var inputValue = input.value.trim();

        if (!checkAlphabetical(inputValue)) {
           // alert(inputValue);
            // Add red border to fields with non-alphabetical characters
            input.classList.add('w3-border-red');
            isValid = false;
        } 
        else 
        {
            // Remove red border if the field is valid
            input.classList.remove('w3-border-red');
        }
    });

    if (isValid) {
        //alert("All alphabetical fields are valid!");
        return true;
    } else {
        alert("Some fields contain non-alphabetical characters.");
        return false;
    }
}
function checkAlphabetical(input) {
    //Regex checking for only alphabetical characters (allows - ' and spaces)
    var regex = /^[a-zA-Z\s'-]+$/;
    return regex.test(input);
}
function checkPostalCode(postalCode)
{
    // Regex provided by UK Government for UK postcodes for developers: https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf
    var ukPostcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
    //var basicPostcodeRegex = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i;
    //Postcodes to test: https://club.ministryoftesting.com/t/what-are-fun-postcodes-to-use-when-testing/10772

    if(ukPostcodeRegex.test(postalCode))
    {
        //alert("Valid Postal Code: " + postalCode);
        return true;
    }
    else
    {
        alert("Invalid Postal Code: " + postalCode);
        return false;
    }
}
function checkPhoneNumber(phone)
{
    // Regex taken from Stack Overflow answer: https://stackoverflow.com/a/19133469
    //var isInternationalRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

   //regex for UK only Phone numbers taken from Stack Overflow Answer: https://stackoverflow.com/a/11518538 
   var isUKRegex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

    if (isUKRegex.test(phone)) {
        //alert("Valid phone number:"+ phone);
        return true;
    } else {
        alert("Invalid phone number:"+ phone);
        return false;
    }

}
function checkDate(dob)
{
    var today = new Date();
    //Only want to compare date not time.
    today.setHours(0,0,0,0);

    if(dob >= today)
    {
        alert("Date of Birth cannot be in the future");
        return false;
    }
    else
    {
        // Calculate age
        var age = today.getFullYear() - dob.getFullYear();
    }
    if(age < 16)
    {
        alert("Employee must be 16 years old");
        return false;
    }

    return true;
}

function getAllJobs()
{
    return fetch(apiAllJobsEndpoint)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        // Work with the JSON data
        console.log(data); // Display or process the fetched data

            // Get the selected element
            const selectJob = document.querySelector('select[name="selectJob"]');
            
            // Clear existing options except the first one (Select Job)
            selectJob.querySelectorAll('option:not(:first-child)').forEach(option => {
                option.remove();
            });

            // Add options based on the data
            data.forEach(job => {
                const option = document.createElement('option');
                option.value = job.id; // Use the appropriate property for the job ID
                option.textContent = job.jobTitle; // Use the appropriate property for the job name
                selectJob.appendChild(option);
            });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function getAllOffices()
{
    return fetch(apiAllOfficesEndpoint)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        // Work with the JSON data
        console.log(data); // Display or process the fetched data

            // Get the selected element
            const selectOffice = document.querySelector('select[name="selectOffice"]');
            
            // Clear existing options except the first one (Select Job)
            selectOffice.querySelectorAll('option:not(:first-child)').forEach(option => {
                option.remove();
            });

            // Add options based on the data
            data.forEach(office => {
                const option = document.createElement('option');
                option.value = office.id; // Use the appropriate property for the job ID
                option.textContent = office.city + ", " + office.country; // JavaScript changes variables to lower/uppercase randomly I dont know why
                selectOffice.appendChild(option);
            });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function checkEmptyFields()
{
    const fields = document.querySelectorAll('input, select');
    let isEmpty = false;

    fields.forEach(field => {
        if (field.value.trim() === '' && field.hasAttribute('required')) {
            isEmpty = true;
            field.classList.add('w3-border-red'); // Add red border to empty required fields
        } else {
            field.classList.remove('w3-border-red'); // Remove red border if field is filled or not required
        }
    });

    if (isEmpty) {
        alert('Please fill in all required fields.');
    }
    else{
        return true;
    }
}

function isOfficeAndJobSelected()
{
    const officeSelect = document.getElementById('selectOffice').value;
    const jobSelect = document.getElementById('selectJob').value;
    let isFieldEmpty = false;
    if(officeSelect.trim() ==='')
    {
        isFieldEmpty = true;
        document.getElementById('selectOffice').classList.add('w3-border-red');
    } else {
        document.getElementById('selectOffice').classList.remove('w3-border-red');
    }
    if(jobSelect.trim() ==='')
    {
        isFieldEmpty = true;
        document.getElementById('selectJob').classList.add('w3-border-red');
    } else {
        document.getElementById('selectJob').classList.remove('w3-border-red');
    }
    
    if (isFieldEmpty) {
        alert('Please fill in all required fields.');
        return false;
    }
    else{
        return true;
    }
}

//Function creates the transfer object to be passed to the api
function createEmployeeDTO()
{
    const employeeDto = {
        fName: document.getElementById('fName').value,
        lName: document.getElementById('lName').value,
        DOB: new Date(document.getElementById('DOB').value).toISOString(),
        pNumber: empPhone
    };
    return employeeDto;
}
function createAddressDto(createdEmployeeID) {
    const addressDto = {
        EmpId: parseInt(createdEmployeeID),
        houseNum: parseInt(document.getElementById('houseNum').value),
        Street: document.getElementById('Street').value,
        Postcode: document.getElementById('Postcode').value,
        City: document.getElementById('City').value,
        Country: document.getElementById('Country').value
    };
    return addressDto;
}

// Function to create a ContactsCreateDto object
function createEmergencyContactsDto(createdEmployeeID) {
    const relationshipSelect = document.querySelector('select[name="relationship"]');
    const relationshipValue = relationshipSelect.value;
    const relationshipText = relationshipSelect.options[relationshipSelect.selectedIndex].text;
    const contactsDto = {
        EmpId: parseInt(createdEmployeeID),
        fName: document.getElementById('emergFName').value,
        lName: document.getElementById('emergLName').value,
        Relationship: relationshipText,
        pNumber: emergencyPhone
    };
    return contactsDto;
}

function createEmployeeJobAndOfficeDto(createdEmployeeID, jobId, officeId) {
    const employeeJODto = {
        EmpId: parseInt(createdEmployeeID), // Assuming the EmpId is generated by the database
        jobId: jobId,
        officeId: officeId
    };
    return employeeJODto;
}

function POSTData() {
    const employeeData = createEmployeeDTO(); //Getting the employee data to send to the api

    fetch(apiEmployeeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        createdEmployeeID = data.id;
        return createAddressDto(createdEmployeeID);
    })
    .then(addressData => {
        return fetch(apiEmployeeAddressEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Address Success:', data);
        return createEmergencyContactsDto(createdEmployeeID);
    })
    .then(contactsData => {
        return fetch(apiEmployeeEmergencyEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactsData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Emergency Contact Success:', data);
        const jobId = document.getElementById('selectJob').value;
        const officeId = document.getElementById('selectOffice').value;
        const employeeJob_OfficeData = createEmployeeJobAndOfficeDto(createdEmployeeID, jobId, officeId);
        return fetch(apiEmploymentEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeJob_OfficeData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Employment Success:', data);
        // Handle success for all requests
        alert("New Employee Successfully Created");
        window.location.href = 'EmployeeList.html';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error for all requests
    });
}

/*
function POSTData()
{
    const employeeData = createEmployeeDTO(); //Getting the employee data to send to the api

    fetch(apiEmployeeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        createdEmployeeID = data.id;
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });


    // POST Employee Address
    const addressData = createAddressDto(createdEmployeeID);

    fetch(apiEmployeeAddressEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });
    

    //POST Employee Emergency Contact
    const contactsData = createEmergencyContactsDto();

    fetch(apiEmployeeEmergencyEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactsData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });

    const jobId = document.getElementById('selectJob').value;
    const officeId = document.getElementById('selectOffice').value;
    const employeeJob_OfficeData = createEmployeeJobAndOfficeDto(jobId, officeId);

    fetch(apiEmploymentEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeJob_OfficeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });
}*/
