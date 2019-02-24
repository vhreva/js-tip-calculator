//Calculate Tip

/*  function name: calculateTip
    description:
    1. Check if bill amount has been entered and service quality selected.
    2. Calculate and display tip and amount each person has to pay
    3. Send AJAX request and alert a message using data from response 

    parameters: none
    return: none

*/
function calculateTip() {
    const billTotal = document.getElementById("billamt").value;
    let peopleAmount = document.getElementById("peopleamt").value
    const selectedOption = document.getElementById("serviceQual").value;
    //if amount of people is not entered or negative number is entered, assume that there is only one person paying the bill  
    if (peopleAmount === "" || peopleAmount < 0) {
        peopleAmount = 1;
    }
    //check if bill total is entered and service quality selected
    if (billTotal === "" || selectedOption == 0) {
        alert("Please enter values");
    } else {
        //calculate and display tip for each person
        /*  variable name: tip 
            type: integer
            description: amount of tip each person has to pay*/
        const tip = billTotal * selectedOption / peopleAmount;
        const resultDiv = document.getElementById("totalAndTip");
        //if calculate button is pressed again, clear previous tip and total results
        resultDiv.innerHTML = "";
        //create new paragraph to store tip result and append it to resultDiv
        const tipResult = document.createElement("p");
        resultDiv.appendChild(tipResult);
        tipResult.innerHTML = "TIP AMOUNT <br/> $" + tip.toFixed(2) + "<br/> each";

        //calculate and display total amount for each person to pay
        /*  variable name: totalToPay 
            type: integer
            description: amount each person has to pay including tip*/
        const totalToPay = billTotal / peopleAmount + tip;
        //create new paragraph to store total result and append it to resultDiv
        const totalResult = document.createElement("p");
        resultDiv.appendChild(totalResult);
        totalResult.innerHTML = "TOTAL AMOUNT <br/> $" + totalToPay.toFixed(2) + "<br/> each";

        //send AJAX request
        //create new XMLHttpRequest object
        const xhrObj = new XMLHttpRequest();
        xhrObj.open("GET", "https://swapi.co/api/people/20");
        xhrObj.send();
        //handle errors
        xhrObj.onerror = function () {
            console.error("An error has occured!");
        }
        xhrObj.onload = function (e) {
            //parse received JSON to JS object to retrieve data
            responseObj = JSON.parse(xhrObj.response);
            alert("You have won a " + responseObj.name + " toy");
        }
    }
}


