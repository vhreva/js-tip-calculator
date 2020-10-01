let sum = document.getElementById('totalAndTip')
let billTotal = 0;

function calculatePrice() {
  let firstArticle = document.getElementById('article1').value
  let secondArticle = document.getElementById('article2').value
  let thirdArticle = document.getElementById('article3').value

  let priceForFirstArticle = document.getElementById('price1').value
  let priceForSecondArticle = document.getElementById('price2').value
  let priceForThirdArticle = document.getElementById('price3').value

  let peoplesCountOfFirstArticle = document.getElementById('peoples1').value
  let peoplesCountOfSecondArticle = document.getElementById('peoples2').value
  let peoplesCountOfThirdArticle = document.getElementById('peoples3').value

  let peopleAmount = Math.max(peoplesCountOfFirstArticle, peoplesCountOfSecondArticle, peoplesCountOfThirdArticle)
  const selectedOption = document.getElementById("serviceQual").value;

  if (firstArticle == '') {
    alert('Please provide name of article number 1')
  } else if (secondArticle == '') {
    alert('Please provide name of article number 2')
  } else if (thirdArticle == '') {
    alert('Please provide name of article number 3')
  } else if (priceForFirstArticle == '') {
    alert('Please provide price of article number 1')
  } else if (priceForSecondArticle == '') {
    alert('Please provide price of article number 2')
  } else if (priceForThirdArticle == '') {
    alert('Please provide price of article number 3')
  } else if (selectedOption == 0) {
    alert('Please choose procent of tip')
  } else {
    billTotal = parseFloat(priceForFirstArticle) + parseFloat(priceForSecondArticle) + parseFloat(priceForThirdArticle)
    const tip = billTotal * selectedOption / peopleAmount;
    sum.innerHTML = `
      <p>Total sum is ${billTotal}$</p>
      <p>Result:<br>
        ${firstArticle} - ${Math.round(priceForFirstArticle/peoplesCountOfFirstArticle * 100) / 100}$ - For ${peoplesCountOfFirstArticle} person(s)<br>
        ${secondArticle} - ${Math.round(priceForSecondArticle/peoplesCountOfSecondArticle * 100) / 100}$ - For ${peoplesCountOfSecondArticle} person(s)<br>
        ${thirdArticle} - ${Math.round(priceForThirdArticle/peoplesCountOfThirdArticle * 100) / 100}$ - For ${peoplesCountOfThirdArticle} person(s)<br>
      </p>
      <p>Tip amount: ${billTotal * selectedOption}$ - ${tip.toFixed(2)}$ for each (${peopleAmount} persons)</p>`
  }
}

document.getElementById('calculate').addEventListener('click', calculatePrice);
