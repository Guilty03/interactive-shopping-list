const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const pendingList = document.getElementById("pending-list");
const purchasedList = document.getElementById("purchased-list");

let shoppingList = [];

// Add item
addBtn.addEventListener("click", () => {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false });
    renderList();
    itemInput.value = "";
  }
});

// Handle actions: toggle purchase, edit, delete
function handleItemAction(index, action) {
  if (action === "toggle") {
    shoppingList[index].purchased = !shoppingList[index].purchased;
  } else if (action === "delete") {
    shoppingList.splice(index, 1);
  } else if (action === "edit") {
    const newName = prompt("Edit item:", shoppingList[index].name);
    if (newName) shoppingList[index].name = newName.trim();
  }
  renderList();
}

// Render list
function renderList() {
  pendingList.innerHTML = "";
  purchasedList.innerHTML = "";

  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = `list-item ${item.purchased ? "purchased" : ""}`;

    li.innerHTML = `
      <span onclick="handleItemAction(${index}, 'toggle')" class="item-name">
        ${item.name}
      </span>
      <div>
        <button onclick="handleItemAction(${index}, 'edit')" class="icon-btn edit-btn">
          ✎
        </button>
        <button onclick="handleItemAction(${index}, 'delete')" class="icon-btn delete-btn">
          ✖
        </button>
      </div>
    `;

    if (item.purchased) {
      purchasedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

// Clear list
clearBtn.addEventListener("click", () => {
  shoppingList = [];
  renderList();
});

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.textContent = "🌙";
    themeIcon.className = "moon-icon";
  } else {
    themeIcon.textContent = "☀";
    themeIcon.className = "sun-icon";
  }
});
