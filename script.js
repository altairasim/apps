const input = document.querySelector(".input");
const btn = document.getElementById("btn");
const todoList = document.getElementById("todo_List");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (input.value !== "") {
    const text = input.value.trim();
    addTask(text);
    input.value = "";
  }
});

function addTask(text) {
  var li = document.createElement("li");
  var label = document.createElement("label");
  label.textContent = text;
  label.classList.add("text");
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("chkbx");
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("deletebtn");
  li.appendChild(label);
  li.appendChild(checkBox);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

todoList.addEventListener("change", (evt) => {
  var checkBox = evt.target;
  var li = checkBox.previousSibling;
  if (checkBox.checked) {
    li.classList.add("completed");
    console.log("completed");
  } else {
    li.classList.remove("completed");
    console.log("uncompleted");
  }
});

todoList.addEventListener("click", (evt) => {
  var deletebtn = evt.target;
  var li = deletebtn.parentNode;

  if (deletebtn.tagName.toLowerCase() === "button") {
    todoList.removeChild(li);
    evt.preventDefault();
  }
});

const storageKey = "todo-items";

function loadItems() {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];
  items.forEach(function (text) {
    addTask(text);
  });
}

function saveItems() {
  const items = [];
  todoList.querySelectorAll("li label").forEach(function (label) {
    items.push(label.textContent);
  });
  localStorage.setItem(storageKey, JSON.stringify(items));
}

loadItems();

window.addEventListener("beforeunload", () => {
  saveItems();
});
