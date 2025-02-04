class Expense {
  static expenses = 0;
  static total = 0;

  constructor(category, amount, date) {
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.deleteBtn = `<button class="deleteBtn">Delete</button>`;
  }
}

document.getElementById("add-expense-btn").addEventListener("click", () => {
  let category = document.getElementById("category").value;
  let amount = Number(document.getElementById("amount").value || 0);

  if (amount < 0) {
    alert("Your amount can't be negative!");
    return;
  }

  let date = document.getElementById("date").value;

  if (!date) {
    alert("You must provide a date!");
    return;
  }

  let expense = new Expense(category, amount, date);
  addNewExpense(expense);
});

function addDeleteEventListeners(button) {
  button.addEventListener("click", (event) => {
    const button = event.target;
    let amountText = button
      .closest("tr")
      .querySelector("td:nth-child(2)").textContent;
    let amount = parseFloat(amountText.replace("$", ""));
    Expense.expenses--;
    Expense.total -= amount;
    document.getElementById("total").textContent = `$${Expense.total.toFixed(
      2
    )}`;
    button.closest("tr").remove();
  });
}

function addNewExpense(expense) {
  Expense.expenses++;

  const tableBody = document.querySelector("#expense-tracker tbody");

  const row = tableBody.insertRow(-1);
  const category = row.insertCell(0);
  const amount = row.insertCell(1);
  const date = row.insertCell(2);
  const deleteBtn = row.insertCell(3);

  category.textContent = expense.category;
  amount.textContent = `$${expense.amount.toFixed(2)}`;
  const [year, month, day] = expense.date.split("-");
  date.textContent = `${month}/${day}/${year}`;
  deleteBtn.innerHTML = expense.deleteBtn;

  Expense.total += expense.amount;
  document.getElementById("total").textContent = `$${Expense.total.toFixed(2)}`;

  addDeleteEventListeners(deleteBtn.querySelector(".deleteBtn"));
}

document.getElementById("clear-form-btn").addEventListener("click", () => {
  document.getElementById("category").value = "Food & Beverage";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
});
