let totalAndTipSection = document.getElementById('totalAndTip')
let nameOfArticleSection = document.getElementById('articleName')
let perPersonPriceSection = document.getElementById('perPersonPrice')
let personsCountSection = document.getElementById('personsCount')
let checkSection = document.getElementById('check')

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

    let firstPerPersonPrice = `${Math.round(priceForFirstArticle/peoplesCountOfFirstArticle * 100) / 100}$`
    let secondPerPersonPrice = `${Math.round(priceForSecondArticle/peoplesCountOfSecondArticle * 100) / 100}$`
    let thirdPerPersonPrice = `${Math.round(priceForThirdArticle/peoplesCountOfThirdArticle * 100) / 100}$`

    nameOfArticleSection.innerHTML = `
      <p>${firstArticle}</p>
      <p>${secondArticle}</p>
      <p>${thirdArticle}</p>`

    perPersonPriceSection.innerHTML = `
      <p>${firstPerPersonPrice}</p>
      <p>${secondPerPersonPrice}</p>
      <p>${thirdPerPersonPrice}</p>`

    personsCountSection.innerHTML = `
      <p>For ${peoplesCountOfFirstArticle} person(s)</p>
      <p>For ${peoplesCountOfSecondArticle} person(s)</p>
      <p>For ${peoplesCountOfThirdArticle} person(s)</p>`

    totalAndTipSection.innerHTML = `
    <p>Total sum is ${billTotal}$</p>
    <p>Tip amount: ${billTotal * selectedOption}$ - ${tip.toFixed(2)}$ for each (${peopleAmount} persons)</p>`

    checkSection.style.display = 'inherit'
  }
}

document.getElementById('calculate').addEventListener('click', calculatePrice);
