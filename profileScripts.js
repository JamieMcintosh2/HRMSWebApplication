//let apiAddress = 'https://localhost:5000/api/';
let apiAddress = 'http://profileservicev1.hpbjgbfgexcqehau.uksouth.azurecontainer.io/api/';
let apiDevelopment = 'http://developmentservicev1.cnd3fxdgewd0hcc8.uksouth.azurecontainer.io/api/'
//let apiAddressEmploymentService = 'https://localhost:5003/api/';
//'http://employmentservice.fxekhph3fmebdhdr.uksouth.azurecontainer.io/api/offices'
let apiAddressEmploymentService = 'http://employmentservicev1.gaevdjc8czexendt.uksouth.azurecontainer.io/api/';
let employeeSelected = JSON.parse(localStorage.getItem('selectedEmployee'));
let selectedDiv = "profileInfo"; // Default selected div
let empPerformance;
let empFeedback;

fetch(apiDevelopment + 'performance/' + employeeSelected.id)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the data received from the backend
    console.log(data);
    empPerformance = data;
    localStorage.setItem('empPerformance', JSON.stringify(empPerformance));
    const weaknessList = document.getElementById('weaknessList');
    const strengthList = document.getElementById('strengthList');
    weaknessList.textContent = data.weaknesses;
    strengthList.textContent = data.strengths;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  fetch(apiDevelopment + 'feedback/' + employeeSelected.id)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the data received from the backend
    console.log(data);
    empFeedback = data;
    localStorage.setItem('empFeedback', JSON.stringify(empFeedback));
    const scoreBar = document.getElementById('scoreBar');
    // Update width percentage
    scoreBar.style.width = data.overallScore + '%';
    scoreBar.textContent = data.overallScore + '%';
  })
  .catch(error => {
    console.error('Error:', error);
  });


  

function hideAllDivs() {
    const divs = ["profileInfo", "addressInfo", "employmentInfo", "emergencyInfo"];
    const buttons = ["btnProfile", "btnAddress", "btnEmployment", "btnEmerg"];
    divs.forEach(divId => {
        const div = document.getElementById(divId);
        if (div) {
            div.style.display = "none";
        }
    });
    buttons.forEach(buttonId => {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.classList.remove("w3-white");
            btn.classList.add("w3-black");
        }
    });
}

function displayEditProfile() {
    hideAllDivs();
    document.getElementById("profileInfo").style.display = "block";
    selectedDiv = "profileInfo";
    const btnProfile = document.getElementById("btnProfile");
    btnProfile.classList.remove("w3-black");

    // Add the new class
    btnProfile.classList.add("w3-white");
    selectedDiv = "profileInfo";


}

function displayEditAddress() {
    hideAllDivs();
    document.getElementById("addressInfo").style.display = "block";
    selectedDiv = "addressInfo";
    const btn = document.getElementById("btnAddress");
    btn.classList.remove("w3-black");

    // Add the new class
    btn.classList.add("w3-white");
    selectedDiv = "addressInfo";
}

function displayEditEmployment() {
    hideAllDivs();
    document.getElementById("employmentInfo").style.display = "block";
    selectedDiv = "employmentInfo";
    const btn = document.getElementById("btnEmployment");
    btn.classList.remove("w3-black");

    // Add the new class
    btn.classList.add("w3-white");
    selectedDiv = "employmentInfo";
}

function displayEditEmerg() {
    hideAllDivs();
    document.getElementById("emergencyInfo").style.display = "block";
    selectedDiv = "emergencyInfo";
    const btn = document.getElementById("btnEmerg");
    btn.classList.remove("w3-black");

    // Add the new class
    btn.classList.add("w3-white");
    selectedDiv = "emergencyInfo";
}

function checkEmptyFields()
{
        //storing all the input/select fields inside the jobAdDiv
    // and checking if they are empty
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

    if (isEmpty) {
        alert('Please fill in all required fields.');
    }
    else{
        return true;
    }
}

function validateInputEmergency(emergencyFName, emergencyLName, emergencyPhone)
{
    if(!checkPhoneNumber(emergencyPhone))
    {
        return false;
    }
    if(!checkAlphabetical(emergencyFName) || !checkAlphabetical(emergencyLName))
    {
        alert("First Name or Last Name contain non-alphabetical characters.");
        return false;
    }
    return true;
}

function validateInputProfile(empFName, empLName, empPhone)
{
    if(!checkPhoneNumber(empPhone))
    {
        return false;
    }
    if(!checkAlphabetical(empFName) || !checkAlphabetical(empLName))
    {
        alert("First Name or Last Name contain non-alphabetical characters.");
        return false;
    }
    return true;
}
function validateInputAddress(empPostcode, empCity, empCountry, houseNum)
{
    if(!checkPostalCode(empPostcode))
    {
        return false;
    }
    if(!checkAlphabetical(empCity) || !checkAlphabetical(empCountry))
    {
        alert("City or Country contain non-alphabetical characters.");
        return false;
    }
    if(!isNumeric(houseNum))
    {
        alert("House number must be numeric");
        return false;
    }
    return true;
}
function isNumeric(value)
{
    //If its Not a Number retrun false
    return !isNaN(parseFloat(value)) && isFinite(value);
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

function UpdateEmploymentInfo()
{
    if(checkEmptyFields())
    {
        let endpoint = apiAddressEmploymentService + 'employees/' + employeeSelected.id;
        const newJobId = document.getElementById('selectJob');
        let newOfficeId = document.getElementById('selectOffice');
        let newEmergPhone = document.getElementById('emergPNumber').value;


            //data to send to the api
        let dataToUpdate = [
            { op: 'replace', path: '/jobId', value: newJobId.options[newJobId.selectedIndex].value },
            { op: 'replace', path: '/officeId', value: newOfficeId.options[newOfficeId.selectedIndex].value }
        ];
        patchEmploymentData(dataToUpdate, endpoint);
    }
}
function patchEmploymentData(dataToUpdate, endpoint)
{
    console.log(dataToUpdate);
    fetch(endpoint, {
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
            alert('Data Successfully updated')
            // Parse the response JSON
            return response.json();

        } else {
            throw new Error('PATCH request failed');
        }
    })
    .then(updatedData => {
        // Log the updated data to the console
        console.log('Updated Data:', updatedData);

        // UPDATE UI


        const departmentElement = document.getElementById('jobDepartment');
        departmentElement.innerHTML = `<b>${updatedData.job.department} Department</b>`;

        const jobRoleElement = document.getElementById('jobRole');
        const jobRole2Element = document.getElementById('jobRole1');
        jobRoleElement.innerHTML = `<b>${updatedData.job.jobTitle}</b>`;
        jobRole2Element.innerHTML = `${updatedData.job.jobTitle}`;

        const jobSalaryElement = document.getElementById('jobSalary');
        jobSalaryElement.innerHTML = `<b>${updatedData.job.salary}</b>`;

        const officeNumElement = document.getElementById('officeNum');
        officeNumElement.innerHTML = `<b>${updatedData.office.buildingNum}</b>`;

        const officeStreetElement = document.getElementById('officeStreet');
        officeStreetElement.innerHTML = `<b>${updatedData.office.street}</b>`;

        const officePostcodeElement = document.getElementById('officePostcode');
        officePostcodeElement.innerHTML = `<b>${updatedData.office.postcode}</b>`;

        const officeCityElement = document.getElementById('officeCity');
        officeCityElement.innerHTML = `<b>${updatedData.office.city}</b>`;

        const officeCountryElement = document.getElementById('officeCountry');
        officeCountryElement.innerHTML = `<b>${updatedData.office.country}</b>`;

    })
    .catch(error => 
    {
        console.error('Error:', error);
        // Handle errors here
    });
}

function UpdateEmergencyInfo()
{
    if(checkEmptyFields())
    {
        let newFName = document.getElementById('emergFName').value;
        let newLName = document.getElementById('emergLName').value;
        //let newRelationship = document.getElementById('relationship').value;
        let newEmergPhone = document.getElementById('emergPNumber').value;
        if(validateInputEmergency(newFName, newLName, newEmergPhone))
        {
            let endpoint = apiAddress + 'emContacts/' + employeeSelected.id;
            const selection = document.getElementById('relationship');
                //data to send to the api
            let dataToUpdate = [
                { op: 'replace', path: '/fName', value: newFName },
                { op: 'replace', path: '/lName', value: newLName },
                { op: 'replace', path: '/relationship', value: selection.options[selection.selectedIndex].text },
                { op: 'replace', path: '/pNumber', value: newEmergPhone }
            ];
            patchEmergencyData(dataToUpdate, endpoint);
        }
    }
}

function patchEmergencyData(dataToUpdate, endpoint)
{
    console.log(dataToUpdate);
    fetch(endpoint, {
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
        // Handle errors here
    });
}


function UpdateAddressInfo()
{
    let newPostcode = document.getElementById('Postcode').value;
    let newCity = document.getElementById('City').value;
    let newCountry = document.getElementById('Country').value;
    let HouseNum = document.getElementById('houseNum').value;
    if(checkEmptyFields())
    {
        if(validateInputAddress(newPostcode, newCity, newCountry, HouseNum))
        {
            let endpoint = apiAddress + 'addresses/' + employeeSelected.id;
            let newHouseNum = parseInt(HouseNum);
            let newStreet = document.getElementById('Street').value;
            
    
                //data to send to the api
            let dataToUpdate = [
                { op: 'replace', path: '/houseNum', value: newHouseNum },
                { op: 'replace', path: '/street', value: newStreet },
                { op: 'replace', path: '/postcode', value: newPostcode },
                { op: 'replace', path: '/city', value: newCity },
                { op: 'replace', path: '/country', value: newCountry }
            ];
            patchAddressData(dataToUpdate, endpoint);
        }
    }
}
function patchAddressData(dataToUpdate, endpoint)
{
    console.log(dataToUpdate);
    fetch(endpoint, {
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
        // Handle errors here
    });
}

function UpdateProfileInfo()
{
    if(checkEmptyFields())
    {
        let newFName = document.getElementById('fName').value;
        let newLName = document.getElementById('lName').value;
        let newPhoneNumber = document.getElementById('pNumber').value;
        if(validateInputProfile(newFName, newLName, newPhoneNumber))
        {
            let endpoint = apiAddress + 'employees/' + employeeSelected.id;
                //data to send to the api
            let dataToUpdate = [
                { op: 'replace', path: '/fName', value: newFName },
                { op: 'replace', path: '/lName', value: newLName },
                { op: 'replace', path: '/pNumber', value: newPhoneNumber }
            ];
            patchProfileData(dataToUpdate, endpoint);
        }
    }
}

function patchProfileData(dataToUpdate, endpoint)
{
    console.log(dataToUpdate);
    fetch(endpoint, {
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
            alert('Data Successfully updated')
            // UPDATE UI
            // UPDATE UI
            location.reload();


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
            // UPDATE UI
            location.reload();
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

function fillSelectOptions(data, selectId, errorMessage, selectedEmployeeData) {
    console.log(selectedEmployeeData);
    const selectElement = document.getElementById(selectId);

    // Clear existing options
    selectElement.innerHTML = '';

    // Check if data is available
    if (data && Array.isArray(data) && data.length > 0) {
        // IF its Job Data
        if(selectId === 'selectJob')
        {
            // Create options based on data
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id; 
                option.textContent = item.jobTitle; // Assuming each item has a 'name' property
                selectElement.appendChild(option);
                if(item.jobTitle === selectedEmployeeData.job.jobTitle)
                {
                    // Set the users job as the selected item
                    console.log('We Here');
                    selectElement.value = item.id;
                }
            });
        }
        // IF its office data
        if(selectId === 'selectOffice')
        {
            // Create options based on data
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id; 
                option.textContent = item.city + ', ' + item.country; // Assuming each item has a 'name' property
                selectElement.appendChild(option);
                if(item.id === selectedEmployeeData.office.id)
                {
                    // Set the first option as selected
                    selectElement.value = item.id;
                }
            });
        }

    } else {
        // If data is not available, show an error message
        const errorOption = document.createElement('option');
        errorOption.textContent = errorMessage;
        selectElement.appendChild(errorOption);
    }

}




// Performing all of the GET requests concurrently

// Define all the API endpoints
let apiProfileEndpoint = apiAddress + 'employees/' + employeeSelected.id;
let apiAddressEndpoint = apiAddress + 'addresses/' + employeeSelected.id;
let apiEmergencyEndpoint = apiAddress + 'emContacts/' + employeeSelected.id;
let apiEmployeeJobEndpoint = apiAddressEmploymentService + 'employees/' + employeeSelected.id;
let apiAllJobsEndpoint = apiAddressEmploymentService + 'jobs';
let apiAllOfficesEndpoint = apiAddressEmploymentService + 'offices';

// Create an array of fetch Promises
let fetchPromises = [
    fetch(apiProfileEndpoint),
    fetch(apiAddressEndpoint),
    fetch(apiEmergencyEndpoint),
    fetch(apiEmployeeJobEndpoint),
    fetch(apiAllJobsEndpoint),
    fetch(apiAllOfficesEndpoint)
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
        const [profileData, addressData, emergencyData, employeeJobData, allJobsData, allOfficesData] = dataArray;


        //work with Profile Data
        // handling name element
        const empNameElement = document.getElementById('empName');
        let employeeName = profileData.fName.concat(" ", profileData.lName);
        empNameElement.textContent = employeeName;
        //Handling age element
        const empAgeElement = document.getElementById('empAge');
        empAgeElement.textContent = profileData.age;
        //Handling phone number element
        const phoneNumElement1 = document.getElementById('EmpPhoneNum');
        phoneNumElement1.textContent = profileData.pNumber;

        //Handling Edit Fields
                //Fill Profile Fields with data from selected employee
                document.getElementById("fName").value = profileData.fName;
                document.getElementById("lName").value = profileData.lName;
                document.getElementById("pNumber").value = profileData.pNumber;

        // Work with address data
        const empCityCountryElement = document.getElementById('cityCountry');
        let cityCountry = addressData.city.concat(", ", addressData.country);
        empCityCountryElement.textContent = cityCountry;
        //Filling address Edit fields
        document.getElementById("houseNum").value = addressData.houseNum;
        document.getElementById("Street").value = addressData.street;
        document.getElementById("Postcode").value = addressData.postcode;
        document.getElementById("City").value = addressData.city;
        document.getElementById("Country").value = addressData.country;



        // Work with emergency contact data
        const relationshipElement = document.getElementById('emergRelationship');
        relationshipElement.textContent = emergencyData.relationship;

        const emergFNameElement = document.getElementById('emergencyFName');
        emergFNameElement.textContent = emergencyData.fName;

        const emergLNameElement = document.getElementById('emergencyLName');
        emergLNameElement.textContent = emergencyData.lName;

        const phoneNumElement = document.getElementById('EmergPhoneNum');
        phoneNumElement.textContent = emergencyData.pNumber;
        //Filling Edit data Fields
        document.getElementById("emergFName").value = emergencyData.fName;
        document.getElementById("emergLName").value = emergencyData.lName;
        document.getElementById("emergPNumber").value = emergencyData.pNumber;
        //Select fields were awkward
        //Had to swap around the values and text data to get them to match
        //e.g. DB Stores "Wife" not the numeric value which is 4. So I had to remap to "Wife" to the value of 4 
        //- Later realised I could have just set the value to the correct string
        // Mapping object for text values to numeric values
        const relationshipMapping = {
            "Father": 1,
            "Mother": 2,
            "Partner": 3,
            "Wife": 4,
            "Husband": 5,
            "Other": 6
        };
        const relationshipFromDB = emergencyData.relationship;
        document.getElementById("relationship").value = relationshipMapping[relationshipFromDB];

        // Usage example for jobs
        fillSelectOptions(allJobsData, 'selectJob', 'Error - Data not loaded', employeeJobData);

        // Usage example for offices
        fillSelectOptions(allOfficesData, 'selectOffice', 'Error - Data not loaded', employeeJobData);

        // Work with employee job data
        //selectedEmployeeData = employeeJobData;
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




