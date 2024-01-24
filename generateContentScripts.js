let displayedDiv = 0;
let apiRecruitmentService = 'http://recruitmentservicev1.hrf4atd3h4b7g8ar.uksouth.azurecontainer.io/api/';
let JobAdPOSTEndpoint = apiRecruitmentService + 'adverts';
let interviewQEndpoint = apiRecruitmentService + 'questions'

function showLoadingOverlay() {
    document.getElementById('id01').style.display = 'block';
}

function hideLoadingOverlay() {
    document.getElementById('id01').style.display = 'none';
}
function toggleDivs() {
    
    const interviewQDiv = document.getElementById('interviewQDiv');
    const jobAdDiv = document.getElementById('jobAdDiv');
    const responsePara = document.getElementById('responsePara');
    const selectedValue = document.getElementById('contentType').value;
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
    const selection = document.getElementById('interviewFormat');

    const questionsDto = {
        jobTitle: document.getElementById('JobQTitle').value,
        keySkills: document.getElementById('JobQSkills').value,
        behaviouralTraits: document.getElementById('JobQTraits').value,
        interviewFormat: selection.options[selection.selectedIndex].text
    };
    console.log(questionsDto);
    return questionsDto;
}

function checkEmptyFieldsJobAd()
{
        //storing all the input/select fields inside the jobAdDiv
    // and checking if they are empty
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
function checkEmptyFieldsInterviewQ()
{
    //storing all the input/select fields inside the interviewQDiv
    // and checking if they are empty
    const fields = document.querySelectorAll('#interviewQDiv input, select');
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
    if (checkEmptyFieldsInterviewQ()) {
        console.log("Interview Q fields Checked and Passed");
        showLoadingOverlay(); // Show loading overlay before API call
        const InterviewQData = createQuestionsDTO();
        fetch(interviewQEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(InterviewQData)
        })
        .then(response => {
            hideLoadingOverlay(); // Hide loading overlay after receiving response
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

function GenerateJobAd() {
    if (checkEmptyFieldsJobAd()) {
        showLoadingOverlay(); // Show loading overlay before API call
        const jobAdData = createJobAdDTO();
        fetch(JobAdPOSTEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobAdData)
        })
        .then(response => {
            hideLoadingOverlay(); // Hide loading overlay after receiving response
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