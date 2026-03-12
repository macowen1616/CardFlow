const binderList = document.getElementById("binderList");
const clearAllBtn = document.getElementById("clearAll");

const saveBinderBtn = document.getElementById("saveBinder");
const binderNameInput = document.getElementById("binderName");
const binderDescInput = document.getElementById("binderDesc");
const binderImageInput = document.getElementById("binderImage");

let binders = JSON.parse(localStorage.getItem("binders")) || [];

function renderBinders() {

binderList.innerHTML = "";

binders.forEach(binder => {

const div = document.createElement("div");

div.className = "binder-item";

div.innerHTML = `
<img src="${binder.image || 'https://via.placeholder.com/200'}">

<h3>${binder.name}</h3>

<p>${binder.desc}</p>

<p>${binder.cards ? binder.cards.length : 0} Cards</p>
`;

binderList.appendChild(div);

});

}

saveBinderBtn.addEventListener("click", () => {

const name = binderNameInput.value.trim();
const desc = binderDescInput.value.trim();
const image = binderImageInput.value.trim();

if(!name){

alert("Binder name required");
return;

}

const newBinder = {

id: Date.now(),

name,

desc,

image,

cards: []

};

binders.push(newBinder);

localStorage.setItem("binders", JSON.stringify(binders));

binderNameInput.value = "";
binderDescInput.value = "";
binderImageInput.value = "";

renderBinders();

});

clearAllBtn.addEventListener("click", () => {

if(!confirm("Delete all binders?")) return;

binders = [];

localStorage.removeItem("binders");

renderBinders();

});

renderBinders();