const raw = localStorage.getItem('data')
const person = JSON.parse(raw)
console.log(person)

let totalAndTipSection = document.getElementById('totalAndTip');
let nameOfArticleSection = document.getElementById('articleName');
let perPersonPriceSection = document.getElementById('perPersonPrice');
let personsCountSection = document.getElementById('personsCount');
let checkSection = document.getElementById('check');

let billTotal = 0;

let articleArray = [];
let pricesArray = [];
let peoplesArray = [];

function calculatePrice() {
  let articlesNames = document.getElementsByClassName('article-name')
  let articlePrices = document.getElementsByClassName('article-price');
  let peoplesCount = document.getElementsByClassName('peoples-count');

  let perPerson = [];

  for (var i = 0; i < peoplesCount.length; i++) {
    peoplesArray.push(peoplesCount[i].value)
  }

  let peopleAmount = Math.max(...peoplesArray)

  const selectedOption = document.getElementById("serviceQual").value;

  if (articlesNames[0].value == '') {
    alert('Please provide name of article number 1')
  } else if (articlesNames[1].value == '') {
    alert('Please provide name of article number 2')
  } else if (articlePrices[0].value == '') {
    alert('Please provide price of article number 1')
  } else if (articlePrices[1].value == '') {
    alert('Please provide price of article number 2')
  } else if (selectedOption == 0) {
    alert('Please choose procent of tip')
  } else {

    for (let i = 0; i < articlePrices.length; i++) {
      pricesArray.push(articlePrices[i].value);
      perPerson.push(Math.round(articlePrices[i].value)/peoplesArray[i] * 100 / 100)
    }

    for (let i = 0; i < pricesArray.length; i++) {
      billTotal = billTotal + parseInt(pricesArray[i]);
    }

    const tip = billTotal * selectedOption / peopleAmount;

    for (var i = 0; i < articlesNames.length; i++) {
      let p = document.createElement('p');
      p.innerHTML = articlesNames[i].value
      document.getElementById('articleName').appendChild(p)
    }

    for (var i = 0; i < articlePrices.length; i++) {
      let p = document.createElement('p');
      p.innerHTML = `${articlePrices[i].value}$`
      document.getElementById('perPersonPrice').appendChild(p)
    }

    for (var i = 0; i < peoplesCount.length; i++) {
      let p = document.createElement('p');
      p.innerHTML = `For ${peoplesCount[i].value} person(s)`
      document.getElementById('personsCount').appendChild(p)
    }

    totalAndTipSection.innerHTML = `
    <p>Total sum is ${billTotal}$</p>
    <p>Tip amount: ${Math.round(billTotal * selectedOption)}$ - ${tip.toFixed(2)}$ for each (${peopleAmount} persons)</p>`

    checkSection.style.display = 'inherit'
  }
}

function newArticle() {
  let articleDiv = document.createElement('div');
  articleDiv.className = 'article-block';
  articleDiv.innerHTML = `
    <div class='form-group'>
      <input type="text" placeholder="" class="form-control article-name">
    </div>
    <div class='form-group'>
      <input type="number" placeholder="" class="form-control article-price">
    </div>
    <div class='form-group'>
      <input type="number" placeholder="" class="form-control peoples-count">
    </div>
    <button type="button" class="btn btn-sm delete-btn">-</button>
  `;
  document.getElementById('articles').appendChild(articleDiv)
  deleteArticle()
}

document.getElementById('calculate').addEventListener('click', calculatePrice);
document.getElementById('new-article').addEventListener('click', newArticle)

function deleteArticle() {
  let removeBtn = document.getElementsByClassName('delete-btn');

  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', function(e) {
      e.currentTarget.parentNode.remove();
    }, false);
  }
}

deleteArticle()
