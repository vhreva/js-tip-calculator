let sum = document.getElementById('results')

function calculatePrice() {
  let tipBtn = document.getElementById('calculate')

  let firstArticle = document.getElementById('article1').value
  let secondArticle = document.getElementById('article2').value
  let thirdArticle = document.getElementById('article3').value

  let priceForFirstArticle = document.getElementById('price1').value
  let priceForSecondArticle = document.getElementById('price2').value
  let priceForThirdArticle = document.getElementById('price3').value

  let peoplesCountOfFirstArticle = document.getElementById('peoples1').value
  let peoplesCountOfSecondArticle = document.getElementById('peoples2').value
  let peoplesCountOfThirdArticle = document.getElementById('peoples3').value

  let sumOfArticles = 0;

  if (firstArticle == '') {
    alert('Please provide name of article number 1')
  } else if (secondArticle == '') {
    alert('Please provide name of article number 2')
  } else if (priceForFirstArticle == '') {
    alert('Please provide price of article number 1')
  } else if (priceForSecondArticle == '') {
    alert('Please provide price of article number 2')
  } else {
    if(priceForThirdArticle == '') {
      priceForThirdArticle = 0;
    }
    sumOfArticles   = parseFloat(priceForFirstArticle) + parseFloat(priceForSecondArticle) + parseFloat(priceForThirdArticle)
    sum.innerHTML = `
      <p>Total Amount is ${sumOfArticles}$</p>
      <p>You must pay:<br>
        ${firstArticle} - ${Math.round(priceForFirstArticle/peoplesCountOfFirstArticle * 100) / 100}$ - For ${peoplesCountOfFirstArticle} person(s)<br>
        ${secondArticle} - ${Math.round(priceForSecondArticle/peoplesCountOfSecondArticle * 100) / 100}$ - For ${peoplesCountOfSecondArticle} person(s)<br>
        ${thirdArticle} - ${Math.round(priceForThirdArticle/peoplesCountOfThirdArticle * 100) / 100}$ - For ${peoplesCountOfThirdArticle} person(s)<br>
      </p>`
  }
  
  function calculateTip() {
      const billTotal = sumOfArticles;
      let peopleAmount = Math.max(peoplesCountOfFirstArticle, peoplesCountOfSecondArticle, peoplesCountOfThirdArticle)
      const selectedOption = document.getElementById("serviceQual").value;
      if (selectedOption == 0) {
        alert("Please choose procent of tip")
      } else {
        const tip = billTotal * selectedOption / peopleAmount;
        const resultDiv = document.getElementById("totalAndTip");
        resultDiv.innerHTML = "";
        const tipResult = document.createElement("p");
        resultDiv.appendChild(tipResult);
        tipResult.innerHTML = `TIP AMOUNT = ${Math.round(billTotal * selectedOption * 100) / 100}$ - ${tip.toFixed(2)}$ for each (${peopleAmount} persons)`;
    }
  }

  tipBtn.addEventListener('click', calculateTip)
}

document.getElementById('sum').addEventListener('click', calculatePrice);
