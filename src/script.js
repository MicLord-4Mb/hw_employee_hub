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

/**
 * Show the action message
 * @param {string} text
 * @param {boolean} isError
 */

function showMessage(text, isError=false){
  messageBox.textContent = text;
  messageBox.style.color = isError ? 'red' : 'green';
}

/**
 * Render employees list in the main section
 * @param {Employee[]} employeesToRender
 */
function renderEmployees(employeesToRender = myCompany.getAllEmployees()) {
  if (employeesToRender.length === 0) {
    formContainer.innerHTML = '<p>Employee list is empty or no matches found.</p>';
    return;
  }
  console.log(employeesToRender);
}

btnAdd.addEventListener('click', () => {
  const id = parseInt(inputId.value);
  const name = inputName.value.trim();
  const title = inputTitle.value.trim();
  const salary = parseFloat(inputSalary.value);

  // Data validation block
  if (!id || isNaN(id)) return showMessage('Error: Invalid ID', true);
  if (!name) return showMessage('Error: Name is empty', true);
  if (!title) return showMessage('Error: Title is empty', true);
  if (!salary || salary <= 10000) return showMessage('Error: Salary must be greater than 10`000 (company rules)', true);

  const isExist = myCompany.getAllEmployees().find(e => e.getId() === id);

  // Update employee section
  if (isExist) return showMessage('Need Update Here', true);

  // add employee section
  const newEmployee = new Employee(id, name, title, salary);
  myCompany.hireEmployee(newEmployee);
  showMessage('Successfully Added Employee');

  // Reset form before render
  inputId.value = '';
  inputName.value = '';
  inputTitle.value = '';
  inputSalary.value = '';

  renderEmployees();
});


btnSearch.addEventListener('click', () => {
  showMessage('Search button clicked')

  const filteredEmployees = myCompany.getAllEmployees()

  renderEmployees(filteredEmployees);
});

btnReset.addEventListener('click', () => {
  showMessage('Reset button clicked')

  inputSearch.value = '';
  renderEmployees();
});

renderEmployees();