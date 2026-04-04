const binderList = document.getElementById("binderList");
const clearAllBtn = document.getElementById("clearAll");
const saveBinderBtn = document.getElementById("saveBinder");
const binderNameInput = document.getElementById("binderName");
const binderDescInput = document.getElementById("binderDesc");
const binderImageInput = document.getElementById("binderImage");

// Load binders from localStorage
let binders = JSON.parse(localStorage.getItem("binders") || "[]");

function saveBinders() {
  localStorage.setItem("binders", JSON.stringify(binders));
}

function renderBinders() {
  binderList.innerHTML = "";
  binders.forEach((binder, index) => {
    const div = document.createElement("div");
    div.className = "binder-item";

    // Handle image display
    let imgSrc = binder.image || "https://via.placeholder.com/200";

    div.innerHTML = `
      <img src="${imgSrc}" alt="${binder.name} binder cover" onerror="this.src='https://via.placeholder.com/200'">
      <h3>${binder.name}</h3>
      <p>${binder.description}</p>
    `;

    // Optional: click to delete binder
    div.addEventListener("dblclick", () => {
      if (confirm(`Delete binder "${binder.name}"?`)) {
        binders.splice(index, 1);
        saveBinders();
        renderBinders();
      }
    });

    binderList.appendChild(div);
  });
}

// Add new binder
saveBinderBtn.addEventListener("click", () => {
  const name = binderNameInput.value.trim();
  const desc = binderDescInput.value.trim();
  const file = binderImageInput.files[0];

  if (!name) return alert("Please enter a binder name.");

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      binders.push({ name, description: desc, image: e.target.result });
      saveBinders();
      renderBinders();
      binderNameInput.value = "";
      binderDescInput.value = "";
      binderImageInput.value = "";
    };
    reader.readAsDataURL(file); // Converts file to base64 string
  } else {
    binders.push({ name, description: desc, image: "" });
    saveBinders();
    renderBinders();
    binderNameInput.value = "";
    binderDescInput.value = "";
    binderImageInput.value = "";
  }
});

// Clear all binders
clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all binders?")) {
    binders = [];
    saveBinders();
    renderBinders();
  }
});

// Initial render
renderBinders();