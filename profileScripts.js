let apiAddress = 'https://localhost:5000/api/';
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

   /* fetch('https://localhost:5000/api/employees/2')
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
    const empNameElement = document.getElementById('empName');
    let employeeName = data.fName.concat(" ", data.lName);
    empNameElement.textContent = employeeName; // Replace 'jobTitle' with the property containing the job title from your API response
    //Handling Emergency name element
    const empAgeElement = document.getElementById('empAge');
    empAgeElement.textContent = data.age;
    //Handling Emergency phone number element
    const phoneNumElement = document.getElementById('EmpPhoneNum');
    phoneNumElement.textContent = data.pNumber;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });*/

