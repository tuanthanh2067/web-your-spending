document.querySelector("#btn-new-sheet").addEventListener("click", createANewSheet);
const container = document.querySelector(".main-container");

let YOU = {
  totalSpending: 0,
  days: [],
  items: [],
  eachItemPrice: [],
  sheets: [],
  eachDaySpend: [],
};

document.addEventListener('DOMContentLoaded', getFromLocalStorage);
document.addEventListener('DOMContentLoaded', loadMoney);

const totalSpending = document.querySelector('#total-spending');
totalSpending.innerText = YOU['totalSpending'];

if (JSON.parse(localStorage.getItem('totalSpending')) === 0) {
  document.addEventListener('DOMContentLoaded', thereIsNothing);
}

function thereIsNothing() {
  const p = document.createElement('p');
  p.setAttribute('id', 'thereIsNothing');
  p.innerText = "There is nothing inside";

  container.appendChild(p);
}


function createANewSheet() {
  if (document.querySelector('#thereIsNothing')) {
    document.querySelector('#thereIsNothing').remove();
  }
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

   if (date === YOU['days'][YOU['days'].length - 1]) {
     alert('Can not create a new one');
   } else {
    const sheetDiv = document.createElement("div");

    const upperDiv = document.createElement("div");
    upperDiv.classList.add("upper");

    const btn = document.createElement("button");
    btn.classList.add("fas");
    btn.classList.add("fa-plus");
    btn.setAttribute("onclick", "editButton(this)");

    upperDiv.appendChild(btn);

    const lowerDiv = document.createElement("div");
    lowerDiv.classList.add("lower");
    const dayH3 = document.createElement("h3");
    dayH3.innerText = date;

    const text = document.createElement("h2");
    text.innerHTML = "Total: $<span class='sheet-spending'>0</span>";
    lowerDiv.appendChild(dayH3);
    lowerDiv.appendChild(text);

    sheetDiv.classList.add("sheet");
    sheetDiv.appendChild(upperDiv);
    sheetDiv.appendChild(lowerDiv);

    container.appendChild(sheetDiv);

    YOU["days"].push(date);
    const itemList = new Array();
    const itemPrice = new Array();
    let sheets = 0;
    let eachDaySpend = 0;

    YOU["items"].push(itemList);
    YOU["eachItemPrice"].push(itemPrice);
    YOU["sheets"].push(sheets);
    YOU["eachDaySpend"].push(eachDaySpend);
 }

  
}

document
  .querySelector("#btn-delete-sheets")
  .addEventListener("click", deleteAllSheets);

function deleteAllSheets() {
  container.innerHTML = "";
  YOU['items'] = [];
  YOU['days'] = [];
  YOU['eachDaySpend'] = [];
  YOU['eachItemPrice'] = [];
  YOU['sheets'] = [];
  YOU['totalSpending'] = 0;

  localStorage.setItem('totalSpending', YOU['totalSpending']);
  localStorage.setItem('days', JSON.stringify(YOU['days']));
  localStorage.setItem('eachItemPrice', JSON.stringify(YOU['eachItemPrice']));
  localStorage.setItem('sheets', JSON.stringify(YOU['sheets']));
  localStorage.setItem('items', JSON.stringify(YOU['items']));
  localStorage.setItem('eachDaySpend', JSON.stringify(YOU['eachDaySpend']));

  document.getElementById('total-spending').innerText = 0;
  thereIsNothing();
}

function editButton(event) {
  const layout = document.querySelector(".overlay");
  layout.style.display = "flex";
  const current = event;
  const parent = current.parentElement.parentElement;

  const date = parent.children[1].children[0].textContent;

  let i = YOU['days'].indexOf(date);

  for (let j = 0; j < YOU['sheets'][i]; j++) {
    const div = document.createElement("div");
    div.classList.add("item");
    const boxInfo = document.createElement("li");
    const boxMoney = document.createElement("li");
    boxInfo.classList.add("box");
    boxMoney.classList.add("box");
    boxMoney.setAttribute("id", "box");

    boxInfo.textContent = YOU['items'][i][j];
    boxMoney.textContent = YOU['eachItemPrice'][i][j];

    const btn = document.createElement("button");
    btn.classList.add("fas");
    btn.classList.add("fa-trash");
    btn.setAttribute("onclick", "removeABoxInside(this)");
    div.appendChild(boxInfo);
    div.appendChild(boxMoney);
    div.appendChild(btn);

    const list = document.querySelector(".list").appendChild(div);
  }

  
  let dateToSet = document.getElementById("dayInsideOverlay");
  dateToSet.textContent = date;

  document.querySelector("#btn-save").addEventListener("click", saveABox);
  document.querySelector("#btn-add").addEventListener("click", addANewBox);
}

function saveABox(element) {
  const day = element.target.parentElement.parentElement.children[0].textContent;
  const index = YOU["days"].indexOf(day);
  const a = document.getElementById("overlay");
  a.style.display = "none";
  saveToLocalStorage();
  const list = document.querySelector('.list');
  list.innerHTML = '';

  const grabDay = document.getElementsByClassName('lower');

  for (let i = 0; i < grabDay.length; i++) {
    if (day === grabDay[i].children[0].textContent) {
      grabDay[i].children[1].children[0].textContent = YOU['eachDaySpend'][index];
      break;
    }
  }
  
  const totalSpending = document.querySelector('#total-spending');
  totalSpending.innerText = YOU['totalSpending'];
}

function addANewBox(element) {
  const date = element.target.parentElement.parentElement.children[0].textContent;
  
  const today = new Date();
  const currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const index = YOU['days'].indexOf(date);

  if (YOU['sheets'][index] < 11 && currentDate === date)  {
    const list = document.querySelector(".list");

    const formContainer = document.createElement("div");
  
    const infoInput = document.createElement("input");
    infoInput.setAttribute("type", "text");
    infoInput.setAttribute("value", "water");
  
    const moneyInput = document.createElement("input");
    moneyInput.setAttribute("type", "number");
    moneyInput.setAttribute("value", "100");
  
    const acceptBtn = document.createElement("button");
    acceptBtn.classList.add("fas");
    acceptBtn.classList.add("fa-plus-square");
    acceptBtn.setAttribute("onclick", "acceptFunction(this)");
  
    formContainer.classList.add("form-div");
    formContainer.appendChild(infoInput);
    formContainer.appendChild(moneyInput);
    formContainer.appendChild(acceptBtn);
  
    list.appendChild(formContainer);
  } else {
    alert("You can not create a new box");
  }


}

function acceptFunction(event) {
  const element = event.parentElement;
  const date = element.parentElement.parentElement.children[0].textContent;
  
  const info = element.children[0].value;
  const money = element.children[1].value;
  //const getDay = element.parentElement.parentElement;
  //console.log(getDay.children[0].innerText);
  element.remove();

  // totalSpending: 0,
  // days: [],
  // items: [],
  // eachItemPrice: [],
  // sheets: [],
  // eachDaySpend: [],

  YOU['totalSpending'] += parseInt(money);

  let i = YOU['sheets'].length - 1;
  YOU['sheets'][i]++;
  YOU['items'][i].push(info);
  YOU['eachItemPrice'][i].push(money);
  YOU['eachDaySpend'][i] += parseInt(money);
  
  const div = document.createElement("div");
  div.classList.add("item");
  const boxInfo = document.createElement("li");
  const boxMoney = document.createElement("li");
  boxInfo.classList.add("box");
  boxMoney.classList.add("box");
  boxMoney.setAttribute("id", "box");

  boxInfo.textContent = info;
  boxMoney.textContent = money;

  const btn = document.createElement("button");
  btn.classList.add("fas");
  btn.classList.add("fa-trash");
  btn.setAttribute("onclick", "removeABoxInside(this)");
  div.appendChild(boxInfo);
  div.appendChild(boxMoney);
  div.appendChild(btn);

  const list = document.querySelector(".list").appendChild(div);
}

function removeABoxInside(element) {
  const today = new Date();
  
  const currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const a = element.parentElement;

  const money = a.children[1].textContent;
  
  const b = element.parentElement.parentElement;
  
  const day = element.parentElement.parentElement.parentElement.children[0].textContent;

  if (day === currentDate) {
    let c = b.children;

    let index = 0;

    for (let i = 0; i < b.childElementCount; i++) {
      if (a === c[i]) {
        index = i; 
        break;
      }
    }

    const indexOfDay = YOU['days'].indexOf(day);

    YOU['eachDaySpend'][indexOfDay] -= parseInt(money);
    YOU['items'][indexOfDay].splice(index, 1);
    YOU['sheets'][indexOfDay]--;
    YOU['totalSpending'] -= parseInt(money);
    YOU['eachItemPrice'][indexOfDay].splice(index, 1);

    a.remove();
  } else {
    alert("You can not delete this box");
  }
}

function saveToLocalStorage() {
  localStorage.setItem('totalSpending', JSON.stringify(YOU['totalSpending']));
  localStorage.setItem('days', JSON.stringify(YOU['days']));
  localStorage.setItem('items', JSON.stringify(YOU['items']));
  localStorage.setItem('eachItemPrice', JSON.stringify(YOU['eachItemPrice']));
  localStorage.setItem('sheets', JSON.stringify(YOU['sheets']));
  localStorage.setItem('eachDaySpend', JSON.stringify(YOU['eachDaySpend']));
}

function getFromLocalStorage() {
  if (localStorage.getItem('totalSpending') === "0" || localStorage.getItem('totalSpending') === null) {
    localStorage.setItem('totalSpending', JSON.stringify(YOU['totalSpending']));
    localStorage.setItem('days', JSON.stringify(YOU['days']));
    localStorage.setItem('items', JSON.stringify(YOU['items']));
    localStorage.setItem('eachItemPrice', JSON.stringify(YOU['eachItemPrice']));
    localStorage.setItem('sheets', JSON.stringify(YOU['sheets']));
    localStorage.setItem('eachDaySpend', JSON.stringify(YOU['eachDaySpend']));
    
  } else {
    YOU['totalSpending'] = JSON.parse(localStorage.getItem('totalSpending'));
    YOU['eachItemPrice'] = JSON.parse(localStorage.getItem('eachItemPrice'));
    YOU['eachDaySpend'] = JSON.parse(localStorage.getItem('eachDaySpend'));
    YOU['days'] = JSON.parse(localStorage.getItem('days'));
    YOU['items'] = JSON.parse(localStorage.getItem('items'));
    YOU['sheets'] = JSON.parse(localStorage.getItem('sheets'));
    let date;
    for (let i = 0; i < YOU['days'].length; i++) {
      date = YOU['days'][i];
      const sheetDiv = document.createElement("div");

      const upperDiv = document.createElement("div");
      upperDiv.classList.add("upper");

      const btn = document.createElement("button");
      btn.classList.add("fas");
      btn.classList.add("fa-plus");
      btn.setAttribute("onclick", "editButton(this)");

      upperDiv.appendChild(btn);

      const lowerDiv = document.createElement("div");
      lowerDiv.classList.add("lower");
      const dayH3 = document.createElement("h3");
      dayH3.innerText = date;

      const text = document.createElement("h2");
      text.innerHTML = "Total: $<span class='sheet-spending'>0</span>";
      lowerDiv.appendChild(dayH3);
      lowerDiv.appendChild(text);

      sheetDiv.classList.add("sheet");
      sheetDiv.appendChild(upperDiv);
      sheetDiv.appendChild(lowerDiv);

      container.appendChild(sheetDiv);

    }    
  }
}

function loadMoney() {  
  const totalSpending = document.querySelector('#total-spending');
  totalSpending.innerText = YOU['totalSpending'];

  const classSheets = document.getElementsByClassName('sheet-spending');

  for (let i = 0; i < YOU['days'].length; i++) {
    classSheets[i].innerText = YOU['eachDaySpend'][i];
  }

}