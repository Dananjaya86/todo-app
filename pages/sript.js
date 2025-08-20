let tasks = [];

function addTask() {
  const name = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  if (!name || !date) return alert("Enter task and date");

  tasks.push({id: Date.now(), name, date, status: "new"});
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
}

function renderTasks() {
  const lists = {
    all: document.getElementById("allList"),
    new: document.getElementById("newList"),
    pending: document.getElementById("pendingList"),
    done: document.getElementById("doneList"),
    cancel: document.getElementById("cancelList")
  };
  Object.values(lists).forEach(ul => ul.innerHTML = "");

  tasks.forEach(task => {

    const createLi = (isAll=false) => {
      const li = document.createElement("li");
      if(isAll) li.classList.add("all-" + task.status);
      li.innerHTML = `<div><input type="checkbox"> ${task.name}</div><span>${task.date} | Status: ${task.status}</span>`;
      const btnRow = document.createElement("div");
      btnRow.className = "btn-row";


      if(task.status === "new") ["pending","done","cancel"].forEach(st => addButton(btnRow, task.id, st));
      else if(task.status === "pending") ["done","cancel"].forEach(st => addButton(btnRow, task.id, st));

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.className = "close-btn";
      closeBtn.onclick = () => removeTask(task.id);
      btnRow.appendChild(closeBtn);

      li.appendChild(btnRow);
      return li;
    };


    if(task.status === "new") lists.new.appendChild(createLi());
    if(task.status === "pending") lists.pending.appendChild(createLi());
    if(task.status === "done") lists.done.appendChild(createLi());
    if(task.status === "cancel") lists.cancel.appendChild(createLi());


    lists.all.appendChild(createLi(true));
  });
}

function addButton(container, id, status) {
  const btn = document.createElement("button");
  btn.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  btn.className = status + "-btn";
  btn.onclick = () => updateStatus(id, status);
  container.appendChild(btn);
}

function updateStatus(id, newStatus) {
  const task = tasks.find(t => t.id === id);
  if(task) {
    task.status = newStatus;
    renderTasks();
  }
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}