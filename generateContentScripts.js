let displayedDiv = 0;
let apiRecruitmentService = 'https://localhost:7130/api/';
let JobAdPOSTEndpoint = apiRecruitmentService + 'adverts';

function toggleDivs() {
    const selectedValue = document.getElementById('contentType').value;
    const interviewQDiv = document.getElementById('interviewQDiv');
    const jobAdDiv = document.getElementById('jobAdDiv');
    const responsePara = document.getElementById('responsePara');

    //IF option selected is for Interview questions display this div and hide Job Ad Div
    if (selectedValue === '1') {
        interviewQDiv.style.display = 'block';
        jobAdDiv.style.display = 'none';
        responsePara.innerHTML = "";
        responsePara.style.display = "none"
        displayedDiv = 1
    } 
    // ELSE do the opposite
    else if (selectedValue === '2') {
        interviewQDiv.style.display = 'none';
        jobAdDiv.style.display = 'block';
        responsePara.innerHTML = "";
        responsePara.style.display = "none"
        displayedDiv = 2;
    }
}

function createJobAdDTO()
{
    const jobAdDto = {
        jobTitle: document.getElementById('jobAdTitle').value,
        keySkills: document.getElementById('jobAdSkills').value,
        jobDescription: document.getElementById('jobAdDescription').value,
        benefits: document.getElementById('jobAdBenefits').value,
    };
    return jobAdDto;
}

function createQuestionsDTO()
{
    //Fixthis
    const questionsDto = {
        jobTitle: parseInt(document.getElementById('houseNum').value),
        keySkills: document.getElementById('Street').value,
        behaviouralTraits: document.getElementById('Postcode').value,
        interviewFormat: document.getElementById('City').value,
    };
    return questionsDto;
}

function checkEmptyFields()
{
    const fields = document.querySelectorAll('#jobAdDiv input');
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

function GenerateInterviewQs()
{
    
}

function GenerateJobAd() {
    if (checkEmptyFields()) {
        const jobAdData = createJobAdDTO();
        fetch(JobAdPOSTEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobAdData)
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
            // Replace '\n' with <br> tags for line breaks
            const formattedData = data.result.replace(/\n/g, '<br>');
            const responsePara = document.getElementById('responsePara');
            responsePara.style.display = 'block'
            responsePara.innerHTML = formattedData;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error - alert the user or perform other actions
        });
    }
}