let providedNames = document.getElementsByTagName("h4");
let personsArray = []

for (var i = 0; i < providedNames.length; i++) {
  personsArray.push(providedNames[i].innerText)
}

function newPerson() {
  let personName = document.getElementById('person-input').value
  if (personName === '') {
    alert('Please provide name')
  } else {
    personsArray.push(personName)
    localStorage.setItem('data', JSON.stringify(personsArray))
    let articleDiv = document.createElement('div');
    articleDiv.className = 'peoples-block';
    articleDiv.innerHTML = `
      <div class='form-group'>
        <h4>${personName}</h4>
      </div>
      <button type="button" class="btn btn-sm delete-btn">x</button>
    `;
    document.getElementById('persons').appendChild(articleDiv)
    document.getElementById('person-input').value = ''
    deleteArticle()
  }
}

function deleteArticle() {
  let removeBtn = document.getElementsByClassName('delete-btn');
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', function(e) {
      e.currentTarget.parentNode.remove();
    }, false);
  }
}
function goToArticlesPage() {
  window.location.href = "articles.html";
}

document.getElementById('going-articles').addEventListener('click', goToArticlesPage)
document.getElementById('new-person').addEventListener('click', newPerson)


deleteArticle()
