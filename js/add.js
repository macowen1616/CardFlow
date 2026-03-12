const form = document.getElementById("cardForm");

const binderSelect = document.getElementById("binderSelect");

const status = document.getElementById("status");

let binders = JSON.parse(localStorage.getItem("binders")) || [];

function loadBinders(){

binders.forEach(binder => {

const option = document.createElement("option");

option.value = binder.id;

option.textContent = binder.name;

binderSelect.appendChild(option);

});

}

loadBinders();

form.addEventListener("submit", function(e){

e.preventDefault();

const binderId = binderSelect.value;

if(!binderId){

alert("Select a binder");

return;

}

let binders = JSON.parse(localStorage.getItem("binders")) || [];

const card = {

name: form.name.value,

series: form.series.value,

expansion: form.expansion.value,

rarity: form.rarity.value,

number: form.number.value,

qty: form.qty.value

};

const binder = binders.find(b => b.id == binderId);

binder.cards.push(card);

localStorage.setItem("binders", JSON.stringify(binders));

status.textContent = "Card added to binder!";

form.reset();

});