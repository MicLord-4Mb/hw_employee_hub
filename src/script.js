import {Company, Employee} from "./obj.js";

const myCompany = new Company();


const formContainer = document.querySelector('.app-form');
const inputId = document.getElementById('emp-id');
const inputName = document.getElementById('emp-name');
const inputTitle = document.getElementById('emp-title');
const inputSalary = document.getElementById('emp-salary');
const btnAdd = document.getElementById('btn-add');
const btnSearch = document.getElementById('btn-search');
const btnReset = document.getElementById('btn-reset');
const inputSearch = document.getElementById('search-query');
const messageBox = document.getElementById('message-box');
const rootStyles = window.getComputedStyle(document.documentElement);
const successColor = rootStyles.getPropertyValue('--color-success').trim();
const errorColor = rootStyles.getPropertyValue('--color-cancel').trim();

/**
 * Show an action message
 * @param {string} text
 * @param {boolean} isError
 */

function showMessage(text, isError=false){
  messageBox.textContent = text;
  messageBox.style.color = isError ? errorColor : successColor;
}

/**
 * Render employees list in the main section
 * @param {Employee[]} employeesToRender
 */
function renderEmployees(employeesToRender = myCompany.getAllEmployees()) {

  // reset container
  formContainer.textContent = '';

  // Empty message
  if (employeesToRender.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Employee list is empty or no matches found.';
    formContainer.appendChild(emptyMsg);
    return;
  }

  // Employees list generator
  const ul = document.createElement('ul');

  employeesToRender.forEach(emp => {
    const li = document.createElement('li');

    // Employee Info container
    const empInfoDiv = document.createElement('div');

    // ID
    const boldId = document.createElement('strong');
    boldId.textContent = 'ID: ';
    empInfoDiv.appendChild(boldId);
    empInfoDiv.appendChild(document.createTextNode(`${emp.getId()} | `));

    // Name
    const boldName = document.createElement('strong');
    boldName.textContent = 'Name: ';
    empInfoDiv.appendChild(boldName);
    empInfoDiv.appendChild(document.createTextNode(`${emp.getName()} | `));

    // Title
    const boldTitle = document.createElement('strong');
    boldTitle.textContent = 'Title: ';
    empInfoDiv.appendChild(boldTitle);
    empInfoDiv.appendChild(document.createTextNode(`${emp.title} | `));

    // Salary
    const boldSalary = document.createElement('strong');
    boldSalary.textContent = 'Salary: ';
    empInfoDiv.appendChild(boldSalary);
    empInfoDiv.appendChild(document.createTextNode(`${emp.getSalary()}`));

    // Button container
    const actionsDiv = document.createElement('div');

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editEmployee(emp.getId());
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.color = errorColor;
    deleteBtn.addEventListener('click', () => {
      deleteEmployee(emp.getId());
    });

    // Lets bundling everything
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(empInfoDiv);
    li.appendChild(actionsDiv);
    ul.appendChild(li);
  });

  // Post the form
  formContainer.appendChild(ul);
}

btnAdd.addEventListener('click', () => {
  const id = parseInt(inputId.value);
  const name = inputName.value.trim();
  const title = inputTitle.value.trim();
  const salary = parseFloat(inputSalary.value);

  // Data validation block
  if (!id || isNaN(id) || id<1) return showMessage('Error: Invalid ID', true);
  if (!name) return showMessage('Error: Name is empty', true);
  if (!title) return showMessage('Error: Title is empty', true);
  if (!salary || salary <= 10000) return showMessage('Error: Salary must be greater than 10`000 (company rules)', true);

  const isExist = myCompany.getAllEmployees().find(e => e.getId() === id);

  // Update employee section
  if (isExist) {
    isExist.setName(name);
    isExist.title = title;
    isExist.setSalary(salary);
    showMessage(`Employee info with ID${id} updated.`);
    // Look in editEmployee
    inputId.disabled = false;
  }
  else {
    // add employee section
    const newEmployee = new Employee(id, name, title, salary);
    myCompany.hireEmployee(newEmployee);
    showMessage('Successfully Added Employee');
  }

  // Reset form before render
  inputId.value = '';
  inputName.value = '';
  inputTitle.value = '';
  inputSalary.value = '';

  renderEmployees();
});


btnSearch.addEventListener('click', () => {
  const query = inputSearch.value.toLowerCase().trim();
  if (!query) return renderEmployees();

  const filteredEmployees = myCompany.getAllEmployees().filter(emp =>
    emp.getName().toLowerCase().includes(query) ||
    emp.title.toLowerCase().includes(query)
  );

  if (filteredEmployees.length === 0) {
    showMessage('No results found.', true);
  }
  else {
    showMessage(`Employees found: ${filteredEmployees.length}`);
  }

  renderEmployees(filteredEmployees);
});

btnReset.addEventListener('click', () => {
  inputSearch.value = '';
  showMessage('')
  renderEmployees();
});

function deleteEmployee(id) {
  myCompany.fireEmployee(id);
  showMessage(`Employee with ID ${id} deleted`);
  renderEmployees();
}

function editEmployee(id) {
  const emp = myCompany.getAllEmployees().find(e => e.getId() === id);

  // Foolproof protection 8-) Paranoid online... )))
  if (emp) {
    inputId.value = emp.getId();
    // PAranoid bock field
    inputId.disabled = true;
    inputName.value = emp.getName();
    inputTitle.value = emp.title;
    inputSalary.value = emp.getSalary();
    showMessage('Data loaded to the head section. Edit and click "Add / Update Employee"');
  }
}

renderEmployees();