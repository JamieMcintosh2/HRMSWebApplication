let selectedRow = '';
let allofficeData;
let selectedOffice;
let selectedDiv ='';

function getAlloffices(){
    //fetch('https://localhost:5003/api/offices')
    fetch('http://employmentservicev1.gaevdjc8czexendt.uksouth.azurecontainer.io/api/offices')
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
    allofficeData = data;
    populateTable(data);
  })
  .catch(error => {
    // Handle errors that may occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
}

function populateTable(data){
    const tableBody = document.getElementById('officeTB');
    //tableBody.innerHTML = '';

    //For Each loop
    data.forEach(office => {
        //Adds a new row to the table for each employee
        const newRow = document.createElement('tr');

        //Self Reminder - Remember to use backticks ` not single or double quotes ' "
        newRow.innerHTML = `<td data-th='office ID'>${office.id}</td> <td data-th='Building Number'>${office.buildingNum}</td> <td data-th='Street'>${office.street}</td> <td data-th='Postcode'>${office.postcode}</td> <td data-th='City'>${office.city}</td> <td data-th='Country'>${office.country}</td>`;
        
        // Add a click event listener to each row
        newRow.addEventListener('click', () => {
            // Remove 'clicked' class from all rows
            const allRows = document.querySelectorAll('tr');
            allRows.forEach(row => {
                row.classList.remove('clicked');
            }); 
            newRow.classList.add('clicked'); 


            selectedRow = office.id;
            console.log('Row clicked! office ID:', selectedRow);
            // Perform actions when a row is clicked
            selectedOffice = allofficeData.find(office => office.id === selectedRow);
        });
        
        tableBody.appendChild(newRow);
    });
}
function addNewofficetoTable(newofficeData)
{
    const tableBody = document.getElementById('officeTB');

    const newRow = document.createElement('tr');

    //Self Reminder - Remember to use backticks ` not single or double quotes ' "
    newRow.innerHTML = `<td data-th='office ID'>${newofficeData.id}</td> <td data-th='Building Number'>${newofficeData.buildingNum}</td> <td data-th='Street'>${newofficeData.street}</td> <td data-th='Postcode'>${newofficeData.postcode}</td> <td data-th='City'>${newofficeData.city}</td> <td data-th='Country'>${newofficeData.country}</td>`;
    
    // Add a click event listener to each row
    newRow.addEventListener('click', () => {
        // Remove 'clicked' class from all rows
        const allRows = document.querySelectorAll('tr');
        allRows.forEach(row => {
            row.classList.remove('clicked');
        }); 
        newRow.classList.add('clicked'); 


        selectedRow = newofficeData.id;
        console.log('Row clicked! office ID:', selectedRow);
        // Perform actions when a row is clicked
        selectedOffice = allofficeData.find(office => office.id === selectedRow);
    });
    
    tableBody.appendChild(newRow);

}
function createofficeDto() {
    const officeDto = {
        buildingNum: parseInt(document.getElementById('officeNum').value),
        street: document.getElementById('officeStreet').value,
        postcode: document.getElementById('officePostcode').value,
        city: document.getElementById('officeCity').value,
        country: document.getElementById('officeCountry').value
    };
    return officeDto;
}

function createNewOffice(){
    const officeData = createofficeDto(); //Getting the office data to send to the api

    //fetch('https://localhost:5003/api/offices', {
    fetch('http://employmentservicev1.gaevdjc8czexendt.uksouth.azurecontainer.io/api/offices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(officeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        createdofficeID = data.id;
        addNewofficetoTable(data);
        alert("New office Created Successfully");
        closeAddofficeModal();
        // Handle success - do something with the response from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });

}

function displayAddofficeModal() {
    var modal = document.getElementById("idAddOffice");
    modal.style.display = "block";
    selectedDiv = '';
}

// Function to close the modal
function closeAddofficeModal() {
    var modal = document.getElementById("idAddOffice");
    modal.style.display = "none";
    selectedDiv = '';

    // Clear input fields
    document.getElementById('officeNum').value = '';
    document.getElementById('officeStreet').value = '';
    document.getElementById('officePostcode').value = '';
    document.getElementById('officeCity').value = '';
    document.getElementById('officeCountry').value = '';
}
function openModal1()
{
    document.getElementById('idAddOffice').style.display = 'block';
    selectedDiv = 'idAddOffice';
}
function openModal2()
{
    if(selectedRow != "")
    {
        document.getElementById('idEditOffice').style.display = 'block';
        selectedDiv = 'idEditOffice';
        populateEditFields();
    }
    else
    {
        alert("You must click a Job from the list first");
    }

}

function populateEditFields()
{
        // Get the edit fields
        const officeNumEdit = document.getElementById('officeNumEdit');
        const officeStreetEdit = document.getElementById('officeStreetEdit');
        const officePostcodeEdit = document.getElementById('officePostcodeEdit');
        const officeCityEdit = document.getElementById('officeCityEdit');
        const officeCountryEdit = document.getElementById('officeCountryEdit');
    
        // Populate the edit fields with data from the selected office
        officeNumEdit.value = selectedOffice.buildingNum;
        officeStreetEdit.value = selectedOffice.street;
        officePostcodeEdit.value = selectedOffice.postcode;
        officeCityEdit.value = selectedOffice.city;
        officeCountryEdit.value = selectedOffice.country;
    
        // Display the edit modal
        document.getElementById('idEditOffice').style.display = 'block';
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

function updateOfficeInfo()
{
    if(checkEmptyFields())
    {
        //let endpoint = apiAddress + 'addresses/' + employeeSelected.id;
        let newOfficeNum = parseInt(document.getElementById('officeNumEdit').value);
        let newStreet = document.getElementById('officeStreetEdit').value;
        let newPostcode = document.getElementById('officePostcodeEdit').value;
        let newCity = document.getElementById('officeCityEdit').value;
        let newCountry = document.getElementById('officeCountryEdit').value;
            //data to send to the api
        let dataToUpdate = [
            { op: 'replace', path: '/buildingNum', value: newOfficeNum },
            { op: 'replace', path: '/street', value: newStreet },
            { op: 'replace', path: '/postcode', value: newPostcode },
            { op: 'replace', path: '/city', value: newCity },
            { op: 'replace', path: '/country', value: newCountry }
        ];
        patchOfficeData(dataToUpdate);
    }
}
function patchOfficeData(dataToUpdate)
{
    //console.log(dataToUpdate);
    fetch('http://employmentservicev1.gaevdjc8czexendt.uksouth.azurecontainer.io/api/offices/' + selectedRow, {
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