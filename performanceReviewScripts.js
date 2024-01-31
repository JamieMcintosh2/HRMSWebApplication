//var strengthsArr = [];
var strengthsList = "";
var weaknessesList = "";
//var weaknessesArr = [];
var allFieldsScored = true;
var totalScore = 0;
let employeeSelected = JSON.parse(localStorage.getItem('selectedEmployee'));
const newDate = new Date();
//Splitting Time element from Date we dont care about it
const todaysDate = newDate.toISOString().split('T')[0];


function createFeedbackDTO()
{
    const feedbackDto = {
        empId: employeeSelected.id,
        feedback: document.getElementById("taFeedback").value,
        overallScore: totalScore,
        feedbackDate: todaysDate
    };
    return feedbackDto;
}

function createPerformanceDTO()
{
    const performanceDto = {
        empId: employeeSelected.id,
        strengths: strengthsList,
        weaknesses: weaknessesList,
        reviewDate: todaysDate
    };
    return performanceDto;
}
function setBadgeColour(performanceScore)
{
    var badgeElement = document.getElementById("score");
    if(performanceScore < 40)
    {
        //Change badge to red
        badgeElement.className = "w3-badge w3-red";
    }
    else if(performanceScore > 39 && performanceScore < 60)
    {
        //Change badge to Orange
        badgeElement.className = "w3-badge w3-orange";
    }
    else
    {
        //Chnage badge to green
        badgeElement.className = "w3-badge w3-green";
    }

}

function CreateFeedback() {

    const feedData = createFeedbackDTO();
    fetch('http://developmentservicev1.cnd3fxdgewd0hcc8.uksouth.azurecontainer.io/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById("spinnerHeading").remove();
        document.getElementById("generateHeading").remove();
        setBadgeColour(data.overallScore);
        document.getElementById("empName").innerText = employeeSelected.fName + " " + employeeSelected.lName;
        document.getElementById("score").innerText = data.overallScore;
        // Handle success - do something with the response from the server
        // Replace '\n' with <br> tags for line breaks
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error - alert the user or perform other actions
    });
}

function CreatePerformance() {

        const perfData = createPerformanceDTO();
        fetch('http://developmentservicev1.cnd3fxdgewd0hcc8.uksouth.azurecontainer.io/api/performance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(perfData)
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error - alert the user or perform other actions
        });
}


function submitReview()
{
    calculateScore();
    if(allFieldsScored === false)
    {
        alert("All fields must be scored!");
        //Resetting Arrays
        strengthsList = "";
        weaknessesList = "";
        strengthsArr = [];
        weaknessesArr = [];
        allFieldsScored = true;
        return;
    }
    else{
        totalScore = Math.round(totalScore);
        /*
        console.log("Total Score: " + totalScore);
        console.log(strengthsArr);
        console.log(weaknessesArr);
        alert(strengthsList);*/

    }


    var feedback = document.getElementById("taFeedback").value;
    if(feedback != "")
    {
        //alert(feedback + " " + todaysDate);
        if(strengthsList === "")
        {
            strengthsList = "No Strengths";
        }
        if(weaknessesList === "")
        {
            weaknessesList = "No Weaknesses"
        }
        openModal2();
        CreatePerformance();
        //Adding 1 second delay to allow server to create performance before creating feedback.
        setTimeout(() => {
            CreateFeedback();
        }, 1000);


    }
    else{
        alert("Please make sure Feedback field is filled in.");
    }
    
}


function calculateScore() {
    var baseScore = 50;
    var criteria = ["Time Management", "Quality", "Productivity", "Communication", "Teamwork", "Leadership", "Adaptability"];
    totalScore = baseScore;


    for (var i = 0; i < criteria.length; i++) {
        var selectedOption = document.querySelector('input[name="' + criteria[i] + '"]:checked');
        if(selectedOption != null)
        {
            var selectedValue = parseFloat(selectedOption.value);
            if(selectedValue === 7.1)
            {
                //Anything scored as Excellent is added as a Strength
                if(strengthsList === "")
                {
                    strengthsList = strengthsList + criteria[i];
                }
                else{
                    strengthsList = strengthsList + ", " + criteria[i];
                }
                
                //strengthsArr.push(criteria[i]);
            }
            if(selectedValue === -7.1)
            {
                //Anything scored as Poor is added as a weakness
                if(weaknessesList === "")
                {
                    weaknessesList = weaknessesList + criteria[i];
                }
                else{
                    weaknessesList = weaknessesList + ", " + criteria[i];
                }
                //weaknessesArr.push(criteria[i]);
            }
            totalScore += selectedValue;
        }
        else{
            allFieldsScored = false;
            break;
        }
    }
    
}

function openModal2()
{
  document.getElementById('id02').style.display = 'block';
}