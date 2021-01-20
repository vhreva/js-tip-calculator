const raw = localStorage.getItem('names');
const person = JSON.parse(raw);

let totalAndTipSection = document.getElementById('totalAndTip');
let nameOfArticleSection = document.getElementById('articleName');
let perPersonPriceSection = document.getElementById('perPersonPrice');
let personsCountSection = document.getElementById('personsCount');
let checkSection = document.getElementById('check');
const multiSelectSection = document.getElementsByClassName('multiSelect');

// let billTotal = 0;

let articleArray = [];
let pricesArray = [];
let peoplesArray = [];

function getNameFromArray() {
  [...multiSelectSection].forEach((parent, i) => {
    if (parent.childElementCount < 1) {
      let form = document.createElement('form');
      let multiselectDiv = document.createElement('div');
      multiselectDiv.className = 'multiselect';
      let selectBoxDiv = document.createElement('div');
      selectBoxDiv.className = 'selectBox';
      let select = document.createElement('select');
      let option = document.createElement('option');
      option.innerHTML = 'Select';
      let overSelectDiv = document.createElement('div');
      overSelectDiv.className = 'overSelect';
      let div = document.createElement('div');
      div.className = 'checkboxes';

      form.appendChild(multiselectDiv);
      multiselectDiv.appendChild(selectBoxDiv);
      selectBoxDiv.appendChild(select);
      select.appendChild(option);
      selectBoxDiv.appendChild(overSelectDiv);

      for (var i = 0; i < person.length; i++) {
        let option = document.createElement('option');
        let label = document.createElement('label');
        label.className = 'checkBoxLabel';
        label.innerHTML = `<input type="checkbox" class="checkname" /><p class="checkBoxName">${person[i]}</p>`;

        div.appendChild(label);
        multiselectDiv.appendChild(div);
        form.appendChild(multiselectDiv);
        parent.appendChild(form);
      }
    }
  });
}

getNameFromArray();

let select = document.getElementsByClassName('selectBox');
let checkboxes = document.getElementsByClassName("checkboxes");

function showCheckboxes(select, checkboxes) {
  let expanded = false;
  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function(e) {
      if (!expanded) {
        checkboxes[i].style.display = "block";
        expanded = true;
      } else {
        checkboxes[i].style.display = "none";
        expanded = false;;
      }
    }, false);
  }
}

showCheckboxes(select, checkboxes)

function creatError(i, el, error) {
  let err = document.createElement('p');
  err.innerHTML = error;
  err.className = 'error'
  document.getElementsByClassName(el)[i].appendChild(err);
}

function calculatePrice() {
  document.getElementById('articleName').innerHTML = '';
  document.getElementById('perPersonPrice').innerHTML = '';
  document.getElementById('personsCount').innerHTML = '';
  document.getElementById('totalAndTip').innerHTML = '';

  let articleBlock = document.getElementsByClassName('article-block');
  let chbox = document.getElementsByClassName('checkname');
  let articlesNames = document.getElementsByClassName('article-name');
  let articlePrices = document.getElementsByClassName('article-price');
  let p = document.createElement('p');
  let removeError = document.getElementsByClassName('error')

  let productsToPay = '';
  let perPerson = [];
  let peoplesAr = [];
  let productsArray = [];
  let billTotal = 0;
  let priceToPay = 0;
  let lastPrice = 0;
  let showError = false;
  let checked = false;

  const selectedOption = document.getElementById("serviceQual").value;

  for (let i = 0; i < removeError.length; i++) {
    removeError[i].style.display = 'none';
  }

  for (let i = 0; i < articleBlock.length; i++) {
    let form = $(articleBlock[i]).children('.multiSelect');
    let checkboxes = $(form).find('.checkname');

    if (articlesNames[i].value == '') {
      let el = 'form-article'
      let error = 'You need to fill input'
      creatError(i, el, error)
      articlesNames[i].style.borderBottom = "2px solid #FF0000";
      showError = true;
    } else {
       articlesNames[i].style.borderBottom = "2px solid #808080"
    }

    if (articlePrices[i].value == '') {
      let el = 'form-price'
      let error = 'You need to fill input'
      creatError(i, el, error)
      articlePrices[i].style.borderBottom = "2px solid #FF0000";
      showError = true;
    } else {
      articlePrices[i].style.borderBottom = "2px solid #808080"
    }

    for (var j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked == true) {
        checked = true;
        break;
      } else {
        checked = false;
      }
    }

    if (!checked) {
      let el = 'multiSelect'
      let error = 'Must be at least one person'
      creatError(i, el, error)
      showError = true;
    }
  }

  if (selectedOption == 0) {
    alert('Please choose procent of tip');
    showError = true;
  }

  if (!showError) {
    for (var x = 0; x < person.length; x++) {
      p = document.createElement('p');
      p.innerHTML = `${person[x]}`;
      document.getElementById('articleName').appendChild(p);

      for (var i = 0; i < articleBlock.length; i++) {
        let form = $(articleBlock[i]).children('.multiSelect');
        let checkboxes = $(form).find('.checkname');
        peoplesAr = [];

        for (var j = 0; j < checkboxes.length; j++) {
          if (checkboxes[j].checked === true && checkboxes[j].nextElementSibling.innerHTML == person[x]) {
            productsArray.push(articlesNames[i].value);
          }
          if (checkboxes[j].checked === true) {
            peoplesAr.push(checkboxes[j].nextElementSibling.innerHTML);
          }
        }

        if (peoplesAr.indexOf(person[x]) != -1) {
          priceToPay = parseInt(articlePrices[i].value) / peoplesAr.length;
          lastPrice = lastPrice + priceToPay;
          priceToPay = 0;
        }
      }

      p = document.createElement('p');
      p.innerHTML = `${lastPrice.toFixed(2)}$`;
      document.getElementById('perPersonPrice').appendChild(p);

      p = document.createElement('p');
      p.innerHTML = `${productsArray} `;
      document.getElementById('personsCount').appendChild(p);

      productsArray = [];
      productsToPay = '';
      priceToPay = 0;
      lastPrice = 0;
    }

    pricesArray = [];

    for (let i = 0; i < articlePrices.length; i++) {
      pricesArray.push(articlePrices[i].value);
    }

    billTotal = 0;

    for (let i = 0; i < pricesArray.length; i++) {
      billTotal += parseInt(pricesArray[i]);
    }

    const tip = billTotal * selectedOption / person.length;

    totalAndTipSection.innerHTML = `
    <p>Total sum is ${billTotal}$</p>
    <p>Tip amount: ${Math.round(billTotal * selectedOption)}$ - ${tip.toFixed(2)}$ for each (${person.length} persons)</p>`

    checkSection.style.display = 'inherit';
  }
}

function newArticle() {
  let articleDiv = document.createElement('div');
  articleDiv.className = 'article-block';
  articleDiv.innerHTML = `
    <div class='form-group form-article'>
      <input type="text" placeholder="" class="form-control article-name">
    </div>
    <div class='form-group form-price'>
      <input type="number" placeholder="" class="form-control article-price">
    </div>
    <div class='form-group multiSelect'>
    </div>
    <button type="button" class="btn btn-sm delete-btn">x</button>
  `;
  document.getElementById('articles').appendChild(articleDiv);
  deleteArticle();
  getNameFromArray();
  showCheckboxes(select, checkboxes);
}

document.getElementById('calculate').addEventListener('click', calculatePrice);
document.getElementById('new-article').addEventListener('click', newArticle);

function deleteArticle() {
  let removeBtn = document.getElementsByClassName('delete-btn');
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', function(e) {
      e.currentTarget.parentNode.remove();
    }, false);
  }
}

deleteArticle()
